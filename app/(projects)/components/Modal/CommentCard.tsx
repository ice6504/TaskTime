import React, { useState, useEffect } from "react";
import UserInCard from "./UserInCard";
import CommentUser from "./CommentUser";
import { createClient } from "@/utils/supabase/client";

interface CommentCardProps {
  onSave: (description: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ onSave }) => {
  const [description, setDescription] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [comments, setComments] = useState<{ id: number; comment_text: string }[]>([]); // state สำหรับเก็บคอมเมนต์
  const supabase = createClient();
  
  
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*");

    if (error) {
      console.error("Error fetching comments: ", error);
    } else {
      setComments(data);
    }
  };

  const handleSaveClick = () => {
    if (description.trim()) {
      onSave(description); // เรียกฟังก์ชัน onSave ที่ส่งมาจาก Comments
      setDescription(""); // เคลียร์ input หลังบันทึก
    }
    setIsInputFocused(false);
  };

  const handleCancelClick = () => {
    setIsInputFocused(false);
    setDescription(""); // เคลียร์ input เมื่อกด cancel
  };

  return (
    <>
      <div className="flex items-center">
        <div className="avatar pb-7">
          <div className="w-8 rounded-full ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="ml-3">
          <h3 className="text-lg pt-4 font-bold">Ajt</h3>
          <input
            className="bg-[#E9E9E9] rounded-lg h-10 w-[480px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type here..."
            type="text"
            value={description}
            onFocus={() => setIsInputFocused(true)}
            onChange={(e) => setDescription(e.target.value)} // เก็บค่าที่พิมพ์ลงใน state
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
                    onClick={handleSaveClick} // บันทึกเมื่อกด Save
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm rounded-md bg-[#E1E1E1] text-[#333333] font-bold"
                    onClick={handleCancelClick} // ยกเลิกเมื่อกด Cancel
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentUser comments={comments}/>
    </>
  );
};

export default CommentCard;
