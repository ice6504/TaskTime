import React from "react";

interface User {
  id: string;
  username: string;
  avatar_url: string; 
  email: string;
}

interface Comment {
  comment_id: number;
  comment_text: string;
  comment_date: string;
  users: User; 
}

interface CommentUserProps {
  comments: Comment[];
}

const CommentUser: React.FC<{ comments: Comment[]; onDelete: (commentId: number) => void }> = ({ comments, onDelete }) => {
  
  return (
    <div className="comment-list mt-4">
      {comments.map((comment) => (
        <div key={comment.comment_id} className="flex items-start mb-3 group w-fit">
          <div className="avatar pb-2">
            <div className="w-8 rounded-full">
              {/* Use the correct avatar_url */}
              <img
                src={comment.users.avatar_url}
                alt={comment.users.username || "User Avatar"}
                className="rounded-full" // Optional: Add styles
              />
            </div>
          </div>
          <div className="ml-3 flex items-center">
            <div className="flex-grow">
              <h3 className="text-lg font-bold">
                {comment.users.username || "Unknown User"}
              </h3>
              <div className="relative">
                <div className="bg-gray-200 text-black font-bold rounded-lg p-2 w-[480px]">
                  {comment.comment_text}
                  <button  onClick={() => onDelete(comment.comment_id)} className="absolute right-2 top-1.5 opacity-0 drop-shadow-sm shadow-md bg-red-500 text-white px-2 py-1 text-sm rounded-full hover:bg-red-700 transition-opacity group-hover:opacity-100">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentUser;
