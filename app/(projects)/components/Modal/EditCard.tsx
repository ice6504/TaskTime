import React from "react";
import CommentCard from "./CommentCard";
import Button from "../Button/Button";
import { useState } from "react";

function EditCard() {
  const [description, setDescription] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSaveClick = () => {
    setIsInputFocused(false);
  };

  const handleCancelClick = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="flex flex-col  gap-y-2 ">
      <h2 className="text-xl font-bold"></h2>
      <div className="flex gap-3 items-center">
        <i className="fa-regular fa-file-lines fa-xl"></i>
        <h2 className="text-xl pl-3 font-bold">Description</h2>
      </div>
      <div className="flex gap-4 justify-between">
        <textarea
          className="py-3 px-4 ml-11 w-[480px] h-[160px] block  border-2  resize-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="This is a textarea placeholder "
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        ></textarea>

        <div className="flex flex-col gap-2 ">
          <button className="btn btn-sm w-48  bg-primary">
            <i className="fa-solid fa-user-plus"></i>
            Add User
          </button>

          <button className="btn btn-sm w-48 bg-primary">Start Date</button>
          <button className="btn btn-sm w-48 bg-primary">End Date</button>
        </div>
      </div>

      <div className="ml-11 ">
        <Button isVisible={isInputFocused} />
      </div>

      <div className=" items-center">
        <h2 className="text-xl pl-11 font-bold">Comment</h2>
      </div>

      <div className="items-center">
        <CommentCard />
      </div>
    </div>
  );
}

export default EditCard;
