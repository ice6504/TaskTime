"use client";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";

// Components
import CreateBoard from "@/components/Project/CreateBoard";
import ProjectBar from "@/components/Project/ProjectBar";
import Project from "@/components/Project/Project";
import CalendarTask from "./components/CalendarTask";
import Highlight from "./components/Highlight";

export default function ProtectedPage() {
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
      <div className="w-full flex flex-col items-center gap-5 pt-20 pb-5 px-4">
        <ProjectBar projectsLength={projects.length} closeModal={toggleModal} />
        <div className="flex flex-col items-center justify-between gap-5 w-full">
          <div className="bg-white/10 rounded-xl w-full px-10 pt-8 pb-8 space-y-6">
            {/* Recent Project */}
            <h2 className="text-xl font-extrabold text-white">
              Recent Project
            </h2>
            {/* Projects */}
            <div className="grid grid-cols-5 w-full gap-5">
              {projects.length > 0 &&
                projects.slice(0, 5).map((project, index: number) => {
                  return (
                    <Project
                      key={index}
                      title={project.title}
                      creator={project.creator.username}
                      boardPicture={project.board_picture}
                    />
                  );
                })}
            </div>

            {/*  */}
            <div className="grid grid-cols-2 w-full gap-10 pt-3">
              <div className="flex flex-col gap-3 bg-white/10 w-full h-[40rem] rounded-xl pt-8 px-8">
                <h2 className="text-2xl font-extrabold text-white ">
                  Calendar
                </h2>
                <div className="space-y-5 overflow-y-scroll pb-5 pt-2">
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                  <CalendarTask />
                </div>
              </div>
              <div className="flex flex-col gap-5 bg-white/10 w-full h-[40rem] rounded-xl pt-8 px-8">
                <h2 className="text-2xl font-extrabold text-white ">
                  Comments
                </h2>
                <div className="space-y-5 overflow-y-scroll pb-5">
                  <Highlight />
                  <Highlight />
                  <Highlight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && <CreateBoard closeModal={handleBoardCreated} />}
    </>
  );
}
