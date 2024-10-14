import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommentCard from "./CommentCard";
import UserInCard from "./UserInCard";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/hooks/useUser";

interface Comment {
  comment_id: number;
  comment_text: string;
  comment_date: string;
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

export default function EditCard({ cardData }: { cardData: CardData }) {
  const supabase = createClient();
  const user = useUser();
  const [showButtonTextarae, setShowButtonTextarae] = useState(false);
  const [originalDescription, setOriginalDescription] = useState(
    cardData.description
  );
  const [description, setDescription] = useState(cardData.description || "");
  const [startDate, setStartDate] = useState<Date | null>(
    cardData.startDate ? new Date(cardData.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    cardData.endDate ? new Date(cardData.endDate) : null
  );
  const [email, setEmail] = useState("");
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);

  useEffect(() => {
    setOriginalDescription(cardData.description);
    setDescription(cardData.description);
  }, [cardData]);

  useEffect(() => {
    const channel = supabase
      .channel("public:cards")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cards",
          filter: `card_id=eq.${cardData.card_id}`,
        },
        (payload) => {
          console.log("Card updated:", payload.new);
          setDescription(payload.new.description); // Automatically refresh description
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Unsubscribe when the component unmounts
    };
  }, [cardData.card_id]);

  const addComment = async (newComment: string) => {
    if (!newComment.trim()) return;

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        comment_text: newComment,
        user_id: user.id,
        card_id: cardData.card_id,
      },
    ]);

    if (error) console.error("Error adding comment: ", error);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  // Modified handleSave to prevent default form behavior
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting in the default way

    // Check if the description has changed
    if (description === originalDescription) {
      console.log("No changes to save.");
      setShowButtonTextarae(false); // Hide the buttons if no changes are made
      return;
    }

    try {
      console.log("Saving new description:", description);

      // Call the Supabase client to update the description
      const { data, error } = await supabase
        .from("cards")
        .update({ description: description })
        .eq("card_id", cardData.card_id);

      if (error) {
        throw error; 
      }

      // If successful, update the original description and hide the button
      setOriginalDescription(description);
      setShowButtonTextarae(false);
    } catch (error) {
      console.error("Error updating card description:", error);
    }
  };

  const handleCancel = () => {
    setDescription(originalDescription);
    setShowButtonTextarae(false);
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail.length >= 3) {
      try {
        const { data: cardMembers, error: memberError } = await supabase
          .from("cardmember")
          .select("user_id")
          .eq("card_id", cardData.card_id);

        if (memberError) {
          console.error("Error fetching board members:", memberError);
          return;
        }

        const memberIds = cardMembers.map((member) => member.user_id);
        const { data: users, error: userError } = await supabase
          .from("users")
          .select("id, username, avatar_url, email")
          .ilike("email", `%${inputEmail}%`)
          .not("id", "in", `(${memberIds.join(",")})`);

        if (userError) {
          console.error("Error fetching users:", userError);
          return;
        }

        setUserSuggestions(users || []);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    } else {
      setUserSuggestions([]);
    }
  };

  // New function to add a user as a member
  const addUserToCard = async (userToAdd: User) => {
    const { error } = await supabase.from("cardmember").insert({
      user_id: userToAdd.id,
      card_id: cardData.card_id,
    });

    if (error) {
      console.error("Error adding user to card:", error);
    } else {
      // Optionally clear the email input and suggestions after adding
      setEmail("");
      setUserSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-3 items-center">
        <i className="fa-regular fa-file-lines fa-xl"></i>
        <h2 className="text-xl pl-3 font-bold">Description</h2>
      </div>
      <div className="flex gap-2 justify-between">
        {/* Form with onSubmit handler */}
        <form className="ml-11 space-y-3" onSubmit={handleSave}>
          <textarea
            className="py-3 px-4 w-[480px] bg-transparent text-black h-40 border-2 resize-none border-black/75 rounded-lg text-sm focus:border-primary duration-300 disabled:opacity-50 disabled:pointer-events-none"
            value={description}
            onFocus={() => setShowButtonTextarae(true)}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {showButtonTextarae && (
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-sm rounded-md bg-primary text-white font-bold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-sm rounded-md bg-[#E1E1E1] text-[#333333] font-bold"
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        <div className="flex flex-col gap-2">
          <details className="dropdown text-white">
            <summary className="btn btn-primary btn-sm w-52">
              <i className="fa-solid fa-user-plus"></i>Add User
            </summary>
            <ul className="menu mt-1 dropdown-content bg-base-100 rounded-xl w-fit p-2 shadow z-10">
              <p className="text-center pb-2 text-lg">Member</p>
              <label className="input input-bordered flex items-center gap-2 p-4">
                <input
                  type="text"
                  className="grow w-full max-w-xs h-10"
                  placeholder="Search by email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              {email.length > 0 ? (
                <>
                  <h2 className="pl-2 pt-5 font-bold">Suggestions</h2>
                  <div className="overflow-y-scroll h-20 mt-2">
                    {userSuggestions.map((user, index) => (
                      <div
                        key={index}
                        onClick={() => addUserToCard(user)}
                        className="hover:bg-white/80 rounded-xl hover:text-black avatar gap-2 p-2 flex items-center text-white cursor-pointer transition-all"
                      >
                        <div className="w-2/12 rounded-full">
                          <img src={user.avatar_url} alt={user.username} />
                        </div>
                        <h3 className="line-clamp-1 w-10/12">
                          {user.username}
                        </h3>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="pl-2 pt-5 font-bold">Card member</h2>
                  <div className="overflow-y-scroll h-20">
                    {cardData.users.map((user, index) => {
                      return <UserInCard key={index} data={user} />;
                    })}
                  </div>
                </>
              )}
            </ul>
          </details>

          <details className="dropdown">
            <summary className="btn btn-primary btn-sm w-52">
              <i className="fa-regular fa-clock"></i> Dates
            </summary>
            <ul className="menu mt-1 dropdown-content bg-base-100 space-y-2 rounded-xl w-fit p-2 shadow z-10">
              <h2 className=" text-white text-center text-lg">Dates</h2>

              <div className="space-y-2">
                <label className="text-white">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
                  className="text-black w-48 p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
                  className="text-black w-48 p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button className="btn btn-primary btn-sm rounded-md bg-primary text-white font-bold">
                  Save
                </button>
                <button className="btn btn-sm rounded-md bg-[#E1E1E1] text-[#333333] font-bold">
                  Cancel
                </button>
              </div>
            </ul>
          </details>
        </div>
      </div>

      <div className="items-center">
        <h2 className="text-xl pl-11 font-bold">Comment</h2>
      </div>

      <div className="items-center">
        {user && (
          <CommentCard onSave={addComment} card={cardData} user={user} />
        )}
      </div>
    </div>
  );
}
