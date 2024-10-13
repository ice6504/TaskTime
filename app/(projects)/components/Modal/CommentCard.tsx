import { useState, useEffect } from "react";
import CommentUser from "./CommentUser";
import { createClient } from "@/utils/supabase/client";

interface Comment {
  comment_id: number;
  comment_text: string;
  comment_date: string;
  card_id: number;
  users: User;
}

interface User {
  id: string;
  username: string;
  avatar_url: string;
  email: string;
}

interface CardData {
  card_id: number;
  card_name: string;
  position_card: number;
  description: string;
  startDate: string;
  endDate: string;
  lists: {
    list_name: string;
  }[];
  users: User[];
  comments: Comment[];
}

interface CommentCardProps {
  onSave: (description: string) => void;
  card: CardData;
  user: User;
}

const CommentCard: React.FC<CommentCardProps> = ({ onSave, card, user }) => {
  const supabase = createClient();
  const [userData, setUserData] = useState<User | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>(card.comments);

  const fetchUser = async () => {
    const { data: fetchedUserData } = await supabase
      .from("users")
      .select(`id, username, avatar_url, email`)
      .eq("id", user.id)
      .single();

    if (fetchedUserData) {
      setUserData(fetchedUserData as User);
    }
  };

  useEffect(() => {
    fetchUser();

    // Subscribe to real-time changes for comments related to this card
    const commentListener = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        async (payload) => {
          const newComment = payload.new as Comment;

          // Check if the comment belongs to the current card
          if (newComment && newComment.card_id === card.card_id) {
            // Fetch user details for the new comment
            const { data: userData } = await supabase
              .from("users")
              .select(`id, username, avatar_url`)
              .eq("id", newComment.user_id) // Assuming newComment has user_id
              .single();

            // Combine comment and user data
            const commentWithUser = {
              ...newComment,
              users: userData, // Attach user details to the comment
            };

            // Update the comments state with the new comment
            setComments((prevComments) => [...prevComments, commentWithUser]);
          }
        }
      )
      .subscribe();

    // Cleanup listener when the component is unmounted
    return () => {
      supabase.removeChannel(commentListener);
    };
  }, [card.card_id, supabase]);
  
  const handleSaveClick = () => {
    if (description.trim()) {
      onSave(description); // Call the onSave function
      setDescription(""); // Clear input after saving
    }
    setIsInputFocused(false);
  };

  const handleCancelClick = () => {
    setIsInputFocused(false);
    setDescription(""); // Clear input on cancel
  };

  return (
    <>
      <div className="flex items-center">
        <div className="avatar pb-7">
          <div className="w-8 rounded-full">
            {/* Profile user */}
            {userData && (
              <img src={userData.avatar_url} alt={userData.username} />
            )}
          </div>
        </div>
        <div className="ml-3">
          {/* User's name */}
          <h3 className="text-lg pt-4 font-bold">{userData?.username}</h3>
          <input
            className="bg-white rounded-lg h-10 w-[480px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary shadow-sm focus:shadow"
            placeholder="Type here..."
            type="text"
            value={description}
            onFocus={() => setIsInputFocused(true)}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="pt-2 flex justify-end relative">
            <div
              className={`${
                isInputFocused ? "visible" : "invisible"
              } absolute right-0`}
            >
              <div className="ml-11">
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm rounded-md bg-primary text-white font-bold"
                    onClick={handleSaveClick} // Save button
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm rounded-md bg-[#E1E1E1] text-[#333333] font-bold"
                    onClick={handleCancelClick} // Cancel button
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentUser comments={comments} />
    </>
  );
};

export default CommentCard;
