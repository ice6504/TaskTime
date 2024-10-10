"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/dateUtils";

// Components
import ShareBoard from "./Modal/ShareBoard";
import Delete from "./Modal/Delete";


function HeaderBar() {
  const today = new Date();
  const router = useRouter();
  const [shareModal, setShareModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const toggleDelModal = () => {
    setDeleteModal(!deleteModal);
  };
  
  const toggleShareModal = () => {
    setShareModal(!shareModal);
  };

  return (
    <>
      <div className="bg-white/10 rounded-xl w-full p-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            {/* Back Button */}
            <div className="grid items-center">
              <button
                onClick={() => router.back()}
                className="btn btn-ghost text-white text-xl"
              >
                <i className="fa-solid fa-angle-left"></i> Back
              </button>
            </div>
            {/* Today */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-md font-medium">TODAY’S DATE</p>
              <p className="text-xl font-bold text-white">
                {formatDate(today)}
              </p>
            </div>
            {/* People */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-md font-medium">PROJECT MEMBERS</p>
              {/* Member */}
              <div
                onClick={toggleShareModal}
                className="w-fit cursor-pointer active:scale-90 avatar-group -space-x-4 rtl:space-x-reverse flex justify-center transition-all duration-100"
              >
                <div className="avatar">
                  <div className="w-9">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-9">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="bg-white/65 text-xl text-white font-bold w-9">
                    <span>+3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Edit */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <i className="fa-solid fa-ellipsis fa-2xl"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu gap-2 bg-black/60 text-xl font-bold text-white rounded-box z-[1] w-64 py-3 shadow"
            >
              <li>
                <a className="flex justify-between">
                  Rename Project <i className="fa-solid fa-pen"></i>
                </a>
              </li>
              <li>
                <a onClick={toggleDelModal} className="flex justify-between hover:bg-error">
                  Delete Project <i className="fa-solid fa-trash-can"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {shareModal && <ShareBoard close={toggleShareModal} />}
      {deleteModal && <Delete close={toggleDelModal}/>}
    </>
  );
}

export default HeaderBar;
