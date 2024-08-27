import { FC } from "react";

interface Props {
  closeModal: () => void;
}

const CreateBoard: FC<Props> = ({ closeModal }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[50rem] h-[48rem] bg-white">
        <button
          onClick={closeModal}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>

        <div className="w-full  flex justify-between">
          <div className="flex ml-12 mt-12 w-32">
            <div className="flex justify-between">
              <label className="input rounded-xl flex-col items-center bg-black/20 text-white text-md size-64 justify-center text-center hover:cursor-pointer">
                <i className="fa-regular fa-image text-3xl pt-24"></i>
                <input hidden type="file" name="filename" />
                <div className="text-xl font-bold mt-3">Upload Picture</div>
              </label>
            </div>
          </div>

          <div>
            <div className="mr-12 mt-12 grid grid-cols-4 gap-3 content-start">
              <button className="rounded-xl size-20 bg-[#EED05F]"></button>
              <button className="rounded-xl size-20 bg-[#96DCA6]"></button>
              <button className="rounded-xl size-20 bg-[#67C5DF]"></button>
              <button className="rounded-xl size-20 bg-[#5395C3]"></button>

              <button className="rounded-xl size-20 bg-[#F3995B]"></button>
              <button className="rounded-xl size-20 bg-[#BB9AEB]"></button>
              <button className="rounded-xl size-20 bg-[#7E5FF2]"></button>
              <button className="rounded-xl size-20 bg-[#03468F]"></button>

              <button className="rounded-xl size-20 bg-[#FFB889]"></button>
              <button className="rounded-xl size-20 bg-[#FFC8C8]"></button>
              <button className="rounded-xl size-20 bg-[#F88080]"></button>
              <button className="rounded-xl size-20 bg-[#EA4B52]"></button>
            </div>
          </div>
        </div>

        <div className="w-full px-12 py-6">
          {" "}
          <form className="pt-1" action="">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl flex items-center font-bold text-black/80">
                Project Name
              </p>
            </div>

            <label className="input rounded-xl flex items-center px-3 gap-4 bg-black/20 text-black/80 text-xl">
              <input
                type="text"
                className="grow"
                placeholder="Project name ..."
              />
            </label>
          </form>
          <p className="text-xl flex items-center font-bold text-black/80 mt-6">
            Visibility
          </p>
          <div className="flex items-center justify-between mt-2">
            <select className="select select-bordered w-64 max-w-xs bg-black/20 text-black/80 font-bold text-xl">
              <option
                selected
                className="font-bold bg-black/20 text-black/80 text-2xl py-10"
                value="public"
              >
                Public
              </option>
              <option
                value="workspace"
                className="font-bold bg-black/20 text-black/80 text-2xl  py-10"
              >
                Workspace
              </option>
              <option
                value="private"
                className="font-bold bg-black/20 text-black/80 text-2xl py-10"
              >
                Private
              </option>
            </select>

            <button className="btn btn-md bg-primary hover:bg-primary/80 border-none rounded-2xl text-white w-40 font-bold text-xl">
              Create
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreateBoard;
