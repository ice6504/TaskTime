import { FC } from "react";
import Member from "./Member";

interface Member {
  id: string;
  username: string;
  avatar_url: string;
  email: string;
}

interface ShareBoardProps {
  creator: string;
  member: Member[];
  close: () => void;
}

const ShareBoard: FC<ShareBoardProps> = ({ creator, member, close }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[50rem] min-h-96 py-8 bg-white">
        <button
          onClick={close}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <div className="px-5 space-y-5 text-black">
          <h2 className="text-4xl font-extrabold">Share Board</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Email Address"
              className="input input-lg input-bordered input-primary w-full bg-transparent"
            />
            <div className="btn btn-primary btn-lg w-28 text-xl font-bold">
              Share
            </div>
          </div>
          <h3 className="text-2xl font-bold border-b-2 border-black">
            Members
          </h3>
          {member.map((data, index) => {
            return <Member creator={creator} data={data} key={index} />;
          })}
        </div>
      </div>
    </dialog>
  );
};

export default ShareBoard;
