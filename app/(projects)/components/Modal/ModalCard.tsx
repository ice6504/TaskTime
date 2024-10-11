import React, { FC  } from "react";
import EditCard from "./EditCard";

interface ModalCardProps {
  close: () => void;
}

const ModalCard: FC<ModalCardProps> = ({ close }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[50rem] min-h-[35rem] py-8 bg-[#FCFCF7]">
        <button
          onClick={close}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <div className="px-4  text-black">
          <h2 className="text-2xl font-extrabold">Event Name</h2>
          <p className="text-gray-400  font-bold">In list Todo</p>
          
          <div className="flex items-center gap-x-3 pb-5 pt-2 text-xl font-extrabold">
            <h3>Member</h3>
            <div className="avatar pl-3">
              <div className="w-8 rounded-full ">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <EditCard/>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalCard;
