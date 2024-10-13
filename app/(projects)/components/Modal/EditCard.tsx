import { useState } from "react";
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

function EditCard({ cardData }: { cardData: CardData }) {
  const supabase = createClient();
  const user = useUser();
  const [description, setDescription] = useState(cardData.description || "");
  const [startDate, setStartDate] = useState<Date | null>(
    cardData.startDate ? new Date(cardData.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    cardData.endDate ? new Date(cardData.endDate) : null
  );

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

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-3 items-center">
        <i className="fa-regular fa-file-lines fa-xl"></i>
        <h2 className="text-xl pl-3 font-bold">Description</h2>
      </div>
      <div className="flex gap-2 justify-between">
        <textarea
          className="py-3 px-4 ml-11 w-[480px] bg-white h-[160px] block border-2 resize-none border-gray-200 rounded-lg text-sm focus:border-primary duration-300 ease  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 hover:border-primary"
          placeholder="This is a textarea placeholder"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Setting description value
        ></textarea>

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
                  placeholder="Search"
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

              <h2 className="pl-2 pt-5 font-bold">Card member</h2>
              <UserInCard />
            </ul>
          </details>

          <details className="dropdown">
            <summary className="btn btn-primary btn-sm w-52">
              <i className="fa-regular fa-clock"></i>Start Date
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

      <div className="ml-11">
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm rounded-md bg-primary text-white font-bold">
            Save
          </button>
          <button className="btn btn-sm rounded-md bg-[#E1E1E1] text-[#333333] font-bold">
            Cancel
          </button>
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

export default EditCard;
