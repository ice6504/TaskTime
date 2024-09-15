import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/hooks/useUser";

interface Project {
  title: string;
  board_picture: string;
  creator: {
    username: string;
  };
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();
  const user = useUser();

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
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, [user, supabase]);

  return { projects, error, fetchUserProjects };
};
