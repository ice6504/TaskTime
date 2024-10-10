import { FC } from "react";

interface DeleteProps {
  close: () => void;
}

const Delete: FC<DeleteProps> = ({ close }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[30rem] h-64 py-8 bg-white">
        <button
          onClick={close}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <div className="w-full h-full flex justify-center items-center">
          <div className="space-y-6 font-bold text-center text-black text-2xl">
            <div>
                <div >You want to delete</div>
                {/* (name) ชื่อ project */}
                <div >" (name) "</div>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-error w-40 rounded-xl text-white font-semibold text-xl ">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Delete;
