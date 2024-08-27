"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";

// Components
import Project from "./components/Project";
import CreateBoard from "./components/CreateBoard";

interface Projects {
  title: string;
  board_picture: string | null;
  creator: {
    username: string;
  };
}

function ProjectsPage() {
  const supabase = createClient();
  const user = useUser();
  const today = new Date();
  const [projects, setProjects] = useState<Projects[]>([]);
  const [modal, setModel] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date).toUpperCase();
  };

  const toggleModel = () => {
    setModel(!modal);
  };

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        if (user) {
          const { data: projectMember, error } = await supabase
            .from("users")
            .select(
              `
              boards!boardmember (
                title, board_picture,
                creator (username)
              )
              `
            )
            .eq("id", user.id)
            .limit(1)
            .single();

          if (error) throw error;
          if (projectMember) {
            setProjects(projectMember.boards);
          }
        }
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    fetchUserProjects();
  }, [user, supabase]);

  return (
    <>
      <div className="flex flex-col items-center px-4 justify-between gap-5 pt-20 pb-5 w-full">
        <div className="bg-white/10 rounded-xl w-full h-fit px-10 py-5">
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
                  {projects.length}
                </p>
              </div>
            </div>
            <button className="btn" onClick={toggleModel}>
              Create Project
            </button>
          </div>
        </div>
        {/* Projects */}
        <div className="flex flex-col items-center justify-between gap-5 w-full">
          <div className="bg-white/10 rounded-xl w-full p-10 space-y-6">
            <div className="flex text-center items-center gap-3">
              <h2 className="text-xl font-extrabold text-white">My Project</h2>
              <h2>{projects.length}</h2>
            </div>

            <div className="grid grid-cols-4 gap-5 min-h-[70vh]">
              {/* card */}
              {projects.length &&
                projects.map((project, index: number) => {
                  return (
                    <Project
                      key={index}
                      title={project.title}
                      creator={project.creator.username}
                    />
                  );
                })}
              {/* <Project title="kds" creator="kdnsj" />
              <Project title="kds" creator="kdnsj" />
              <Project title="kds" creator="kdnsj" />
              <Project title="kds" creator="kdnsj" /> */}
            </div>
          </div>
        </div>
      </div>
      {modal && <CreateBoard closeModal={toggleModel} />}
    </>
  );
}

export default ProjectsPage;
