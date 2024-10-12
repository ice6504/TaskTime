"use client";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";

// Components
import CreateBoard from "@/components/Project/CreateBoard";
import ProjectBar from "@/components/Project/ProjectBar";
import Project from "@/components/Project/Project";

function MyProjectsPage() {
  const { projects, error, fetchUserProjects } = useProjects();
  const [modal, setModel] = useState<boolean>(false);

  const toggleModal = () => {
    setModel(!modal);
  };

  const handleBoardCreated = () => {
    fetchUserProjects();
    toggleModal();
  };

  return (
    <>
      <div className="flex flex-col items-center px-4 gap-5 pt-20 pb-5 w-full">
        <ProjectBar projectsLength={projects.length} openModal={toggleModal} />
        {/* Projects */}
        <div className="flex flex-col items-center justify-between gap-5 w-full">
          <div className="bg-white/10 rounded-xl w-full p-10 space-y-6">
            <div className="flex text-center items-center gap-3">
              <h2 className="text-xl font-extrabold text-white">My Project</h2>
              <span>{projects.length}</span>
            </div>

            <div className="grid grid-cols-4 gap-5 min-h-[70vh]">
              {/* card */}
              {projects.length > 0 &&
                projects.map((project, index: number) => {
                  return (
                    <Project
                      key={index}
                      id={project.board_id}
                      title={project.title}
                      creator={project.creator.username}
                      boardPicture={project.board_picture}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {modal && <CreateBoard closeModal={handleBoardCreated} />}
    </>
  );
}

export default MyProjectsPage;
