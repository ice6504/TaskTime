import { FC } from "react";
import BoardView from "../../components/BoardView";

interface ProjectsPage {
  params: Params;
}

interface Params {
  title: string;
}

const ProjectsPage: FC<ProjectsPage> = ({ params }) => {
  return (
    <div className="h-full">
      <BoardView />
    </div>
  );
};

export default ProjectsPage;
