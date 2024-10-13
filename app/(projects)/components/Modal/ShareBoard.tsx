import { createClient } from "@/utils/supabase/client";
import { FC, useState, useEffect } from "react";
import Member from "./Member";

interface Member {
  id: string;
  username: string;
  avatar_url: string;
  email: string;
}

interface ShareBoardProps {
  creator: string;
  member: Member[];
  board_id: string;
  close: () => void;
}

const ShareBoard: FC<ShareBoardProps> = ({
  creator,
  member,
  board_id,
  close,
}) => {
  const supabase = createClient();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userSuggestions, setUserSuggestions] = useState<Member[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from<BoardMember>("boardmember")
        .select(
          `
          user_id,
          users (
            id,
            username,
            avatar_url
          )
        `
        )
        .eq("board_id", board_id);

      if (error) {
        console.error("Error fetching members:", error);
      } else {
        const users = data.map((member) => member.users); // ดึงข้อมูลผู้ใช้จากสมาชิก
        setMembers(users);
      }
    };

    const memberListener = supabase
      .channel("public:boardmember")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "boardmember" },
        async (payload) => {
          console.log("Change received:", payload);
          const newMemberData = payload.new as BoardMember;

          // เช็คว่าผู้ใช้ใหม่ตรงกับ board_id หรือไม่
          if (newMemberData && newMemberData.board_id === board_id) {
            const { data: userData, error: userError } = await supabase
              .from<User>("users")
              .select("id, username, avatar_url")
              .eq("id", newMemberData.user_id)
              .single();

            if (userError) {
              console.error("Error fetching user data:", userError);
            } else if (userData) {
              setMembers((prevMembers) => [...prevMembers, userData]); // อัปเดต state ด้วยข้อมูลผู้ใช้ใหม่
            }
          }
        }
      )
      .subscribe();

    fetchMembers(); // เรียกข้อมูลครั้งแรก

    return () => {
      supabase.removeChannel(memberListener); // Unsubscribe เมื่อ component ถูก unmount
    };
  }, [board_id]);

  // Search for users based on the email input
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check if board_id is valid
    if (!board_id) {
      console.error(
        "Board ID is undefined. Please ensure it's passed correctly."
      );
      return;
    }

    if (inputEmail.length >= 3) {
      try {
        // Fetch board members
        const { data: boardMembers, error: memberError } = await supabase
          .from("boardmember")
          .select("user_id")
          .eq("board_id", board_id);

        if (memberError) {
          console.error("Error fetching board members:", memberError);
          return;
        }

        const memberIds = boardMembers.map((member) => member.user_id);

        // Fetch users not in the boardmember list
        const { data: users, error: userError } = await supabase
          .from("users")
          .select("id, username, avatar_url, email")
          .ilike("email", `%${inputEmail}%`)
          .not("id", "in", `(${memberIds.join(",")})`); // Fix the format for the .not() filter

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

  // Add a user to the selected users list
  const handleSelectUser = (user: Member) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
    setUserSuggestions([]);
    setEmail("");
  };

  // Remove a user from the selected users list
  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Share the board with the selected users
  const handleShare = async () => {
    if (selectedUsers.length === 0) return;

    setLoading(true);
    try {
      const insertData = selectedUsers.map((user) => ({
        user_id: user.id,
        board_id: board_id,
      }));

      // Insert the users as board members
      const { error: insertError } = await supabase
        .from("boardmember")
        .insert(insertData);

      if (insertError) {
        console.error("Error sharing board:", insertError);
      } else {
        console.log("Board shared successfully!");
      }
    } catch (error) {
      console.error("Error sharing board:", error);
    } finally {
      setLoading(false);
      setEmail(""); // Clear input field after sharing
      setUserSuggestions([]);
      setSelectedUsers([]); // Clear selected users
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[50rem] min-h-96 py-8 bg-white">
        <button
          onClick={close}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <div className="px-5 space-y-5 text-black">
          <h2 className="text-4xl font-extrabold">Share Board</h2>

          <div className="flex gap-3 relative">
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Search by Email Address"
              className="input input-lg font-bold input-bordered input-primary w-full bg-transparent"
            />
            <button
              className={`btn btn-primary btn-lg w-28 text-xl font-bold`}
              onClick={handleShare}
              disabled={loading}
            >
              {loading ? "Sharing..." : "Share"}
            </button>

            {/* User suggestions dropdown */}
            {userSuggestions.length > 0 && (
              <ul className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
                {userSuggestions.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleSelectUser(user)} // Add user to selected users
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display selected users */}
          {selectedUsers.length > 0 && (
            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold">Selected Users</h3>
              <ul className="list-none">
                {selectedUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar_url}
                        alt={user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveUser(user.id)} // Remove user from selected users
                      className="btn btn-ghost hover:bg-red-500 hover:text-white btn-xs"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="text-2xl font-bold border-b-2 border-black mt-5">
            Members
          </h3>
          {members.map((data) => {
            return (
              <Member
                board_id={board_id}
                creator={creator}
                data={data}
                key={data.id}
              />
            );
          })}
        </div>
      </div>
    </dialog>
  );
};

export default ShareBoard;
