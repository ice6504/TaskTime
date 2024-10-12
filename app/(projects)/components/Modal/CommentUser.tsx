import React from "react";

interface Comment {
  id: number;
  comment_text: string;
}

interface CommentUserProps {
  comments: Comment[];
}

const CommentUser: React.FC<CommentUserProps> = ({ comments }) => {
  

  return (
    <div className="comment-list mt-4"> {/* เพิ่ม margin ให้กับ comment list */}
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start mb-4"> {/* ใช้ flex เพื่อจัดตำแหน่ง */}
          <div className="avatar pb-2"> {/* เพิ่ม padding เพื่อให้มีระยะห่าง */}
            <div className="w-8 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
            </div>
          </div>
          <div className="ml-3 flex flex-col"> {/* จัดเรียงคอมเมนต์ในแนวตั้ง */}
            <h3 className="text-lg font-bold">Ajt</h3>
            <div className="bg-gray-300 text-black font-bold rounded-xl p-2"> {/* ใช้ padding ให้เหมาะสม */}
              {comment.comment_text} {/* แสดงข้อความคอมเมนต์ */}
            </div>
            <div className="pt-2 flex justify-end relative"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentUser;
