import React, { useState } from "react";
import Button from "../Button/Button";
import CommentUser from "./CommentUser";

function CommentCard() {
  const [description, setDescription] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSaveClick = () => {
    setIsInputFocused(false);
  };

  const handleCancelClick = () => {
    setIsInputFocused(false);
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
            className="bg-[#E9E9E9] rounded-lg h-10 w-[480px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200  px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type here..."
            type="text"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <div className="pt-2 flex justify-end relative">

            <div
              className={`${
                isInputFocused ? "visible" : "invisible"
              } absolute right-0`}
            >
              <Button isVisible={isInputFocused} />
            </div>
          </div>
        </div>
      </div>
      <CommentUser/>
    </>
  );
}

export default CommentCard;
