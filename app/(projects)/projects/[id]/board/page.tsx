import { FC } from "react";
import Link from "next/link";
import BoardView from "../../../components/BoardView";

interface ProjectsPage {
  params: Params;
}

interface Params {
  id: string;
}

const ProjectsPage: FC<ProjectsPage> = ({ params }) => {
  return (
    <>
      <div className="flex gap-3">
        <Link href={`/projects/${params.id}/board`}className="btn btn-primary w-28">
          <i className="fa-regular fa-file-lines"></i> Board
        </Link>
        <Link
          href={`/projects/${params.id}/timeline`}
          className="btn w-28"
        >
          <i className="fa-regular fa-clock"></i> Timeline
        </Link>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between mb-5">
        <div className="flex items-center p-4 w-1/2 bg-black/30 rounded-xl">
          <h2 className="font-bold text-white">BNK-48 Event handshake</h2>
          <span className="ml-3 text-sm">(10 tasks)</span>
        </div>
        <button className="btn bg-black/50 font-bold h-14">
          <i className="fa-solid fa-user-check"></i> Mytask
        </button>
      </div>
      <div className="h-full">
        <BoardView />
      </div>
    </>
  );
};

export default ProjectsPage;
