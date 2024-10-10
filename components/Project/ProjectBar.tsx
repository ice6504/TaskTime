import { FC } from "react";
import { formatDate } from "@/lib/dateUtils";

interface Props {
  projectsLength: number;
  openModal: () => void;
}

const ProjectBar: FC<Props> = ({ projectsLength, openModal }) => {
  const today = new Date();

  return (
    <div className="bg-white/10 rounded-xl w-full px-10 py-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-10">
          {/* Today */}
          <div className="grid justify-items-center">
            <p className="text-md font-medium">TODAY’S DATE</p>
            <p className="pt-2 text-xl font-bold text-white">
              {formatDate(today)}
            </p>
          </div>
          {/* Total Projects */}
          <div className="flex flex-col">
            <p className="text-md font-medium">TOTAL PROJECT</p>
            <p className="pt-2 text-xl font-bold text-white text-center">
              {projectsLength}
            </p>
          </div>
        </div>
        <button className="btn" onClick={openModal}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectBar;
