import { FC } from "react";

interface Props {
  projectsLength: number;
  closeModal: () => void;
}

const ProjectBar: FC<Props> = ({ projectsLength, closeModal }) => {
  const today = new Date();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date).toUpperCase();
  };

  return (
    <div className="bg-white/10 rounded-xl w-full px-10 py-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-10">
          {/* Today */}
          <div className="grid justify-items-center">
            <p className="text-md font-medium">TO DAY’S DATE</p>
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
        <button className="btn" onClick={closeModal}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default ProjectBar;
