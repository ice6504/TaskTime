import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddModal from "./AddModal";
import CommentCard from "./CommentCard";
import Button from "../Button/Button";
import UserInCard from "./UserInCard";

function EditCard() {
  const [description, setDescription] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSaveClick = () => {
    setIsInputFocused(false);
  };

  const handleCancelClick = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-xl font-bold"></h2>
      <div className="flex gap-3 items-center">
        <i className="fa-regular fa-file-lines fa-xl"></i>
        <h2 className="text-xl pl-3 font-bold">Description</h2>
      </div>
      <div className="flex gap-4 justify-between">
        <textarea
          className="py-3 px-4 ml-11 w-[480px] bg-white h-[160px] block border-2 resize-none border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="This is a textarea placeholder "
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        ></textarea>

        <div className="flex flex-col gap-2">
          <details className="dropdown text-white">
            <summary className="btn btn-primary btn-sm w-48">
              <i className="fa-solid fa-user-plus"></i>Add User
            </summary>
            <ul className="menu mt-1 dropdown-content bg-base-100 rounded-xl w-52 p-2 shadow z-10">
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
              <UserInCard/>
            </ul>
          </details>

          <details className="dropdown ">
            <summary className="btn btn-primary btn-sm w-48">
              <i className="fa-solid fa-user-plus "></i>Start Date
            </summary>
            <ul className="menu mt-1 dropdown-content bg-base-100 space-y-2 rounded-xl w-52 p-2 shadow z-10">
              <h2 className=" text-white text-center">Dates</h2>

              <div className="">
                <label className="text-white ">Start Date </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd-mm-yyyy"
                />
              </div>

              <div className="">
                <label className="text-white w-full">End Date </label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd-mm-yyyy"
                />
              </div>
              <div className="flex flex-col gap-2 ">
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
        <Button isVisible={isInputFocused} />
      </div>

      <div className="items-center">
        <h2 className="text-xl pl-11 font-bold">Comment</h2>
      </div>

      <div className="items-center">
        <CommentCard />
      </div>
      {modal && <AddModal close={toggleModal} />}
    </div>
  );
}

export default EditCard;
