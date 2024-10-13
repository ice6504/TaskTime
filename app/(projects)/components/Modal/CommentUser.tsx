import React from "react";

interface Comment {
  comment_id: number; // เปลี่ยน id เป็น comment_id
  comment_text: string;
  comment_date: string;
  card_id: number;
  users: {
    username: string; // ข้อมูลชื่อผู้ใช้
  };
}

interface CommentUserProps {
  comments: Comment[];
}

const CommentUser: React.FC<CommentUserProps> = ({ comments }) => {
  return (
    <div className="comment-list mt-4">
      {" "}
      {/* เพิ่ม margin ให้กับ comment list */}
      {comments.map((comment) => (
        <div
          key={comment.comment_id}
          className="flex items-start mb-3 group w-fit" // ใช้ flex และ group
        >
          <div className="avatar pb-2">
            <div className="w-8 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          <div className="ml-3 flex items-center">
            {" "}
            {/* ใช้ flex เพื่อตั้งตำแหน่งของปุ่มและข้อความให้อยู่ในบรรทัดเดียวกัน */}
            <div className="flex-grow ">
              {" "}
              {/* flex-grow เพื่อให้คอมเมนต์ขยายเต็มที่ */}
              <h3 className="text-lg font-bold">
                {comment.users?.username || "Unknown User"}
              </h3>{" "}
              {/* แสดงชื่อผู้ใช้ */}
              <div className="relative">
                <div className="bg-gray-200 text-black font-bold rounded-lg p-2 w-[480px]">
                  {" "}
                  
                  {comment.comment_text} 
                  <button className="absolute right-2 top-1.5 opacity-0 drop-shadow-sm shadow-md  bg-red-500 text-white px-2 py-1 text-sm rounded-full hover:bg-red-700 transition-opacity group-hover:opacity-100">
                  <i className="fa-solid fa-trash-can"></i>
                </button>{" "}
                </div>
               
                {/* เพิ่มปุ่มทางขวาของคอมเมนต์ */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentUser;
