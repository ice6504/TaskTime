import React from "react";

function Highlight({ text, user }) {
  return (
    <div className="w-full flex flex-col min-h-40">
      <div className="flex items-center p-5 bg-black/70 text-white h-20 rounded-t-xl">
        <div className="flex items-center gap-5 grow">
          <div className="avatar">
            <div className="w-12 rounded-full">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username || "User avatar"}
                />
              ) : (
                <div className="bg-gray-300 w-full h-full rounded-full" />
              )}
            </div>
          </div>
          <p className="font-medium text-xl">{user.username}</p>
        </div>
        {/* <button className="cursor-pointer hover:text-red-600 duration-150">
          <i className="fa-solid fa-trash-can fa-lg"></i>
        </button> */}
      </div>
      <div className="grow bg-white text-black font-bold rounded-b-xl p-5">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Highlight;
