"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useUser } from "@/hooks/useUser";

// Components
import CreateBoard from "@/components/Project/CreateBoard";
import ProjectBar from "@/components/Project/ProjectBar";
import Project from "@/components/Project/Project";
import CalendarTask from "./components/CalendarTask";
import Highlight from "./components/Highlight";

interface Card {
  card_id: number;
  card_name: string;
  description: string;
  startDate: string;
  endDate: string;
  comments: Comment[];
}

interface Comment {
  comment_text: string;
  comment_date: string;
  users: {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
  };
}

export default function ProtectedPage() {
  const supabase = createClient();
  const user = useUser();
  const { projects, error, fetchUserProjects } = useProjects();
  const [cards, setCards] = useState<Card[]>([]);
  const [modal, setModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserCards = async () => {
    if (!user) return; // Return early if user is not available

    try {
      const { data, error } = await supabase
        .from("users")
        .select(
          `cards
            (card_id, card_name, description, startDate, endDate,
              comments!comments_card_id_fkey(comment_text, comment_date, 
              users!comments_user_id_fkey1(id, username, email, avatar_url))
            )
          `
        )
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data?.cards) {
        setCards(data.cards);
      }
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  // Subscribe to real-time changes in the comments table
  const subscribeToComments = () => {
    const channel = supabase
      .channel('realtime-comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, (payload) => {
        handleCommentUpdate(payload);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const handleCommentUpdate = async (payload) => {
    const { eventType, new: newComment } = payload;

    try {
      // Fetch user details for the new comment
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, username, avatar_url")
        .eq("id", newComment.user_id) // Assuming newComment has user_id
        .single();

      if (userError) throw userError;

      // Combine comment and user data
      const commentWithUser = {
        ...newComment,
        users: userData, // Attach user details to the comment
      };

      if (eventType === "INSERT") {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.card_id === newComment.card_id
              ? { ...card, comments: [...card.comments, commentWithUser] }
              : card
          )
        );
      }

      if (eventType === "UPDATE") {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.card_id === newComment.card_id
              ? {
                  ...card,
                  comments: card.comments.map((comment) =>
                    comment.comment_text === newComment.comment_text
                      ? commentWithUser
                      : comment
                  ),
                }
              : card
          )
        );
      }

      if (eventType === "DELETE") {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.card_id === newComment.card_id
              ? {
                  ...card,
                  comments: card.comments.filter(
                    (comment) => comment.comment_text !== newComment.comment_text
                  ),
                }
              : card
          )
        );
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCards();
      setLoading(false); // Data fetching is complete
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      const unsubscribe = subscribeToComments();
      return () => {
        unsubscribe(); // Cleanup on component unmount
      };
    }
  }, [loading, user]);

  const toggleModal = () => {
    setModel(!modal);
  };

  const handleBoardCreated = () => {
    fetchUserProjects();
    toggleModal();
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-5 pt-20 pb-5 px-4">
        <ProjectBar projectsLength={projects.length} openModal={toggleModal} />
        <div className="flex flex-col items-center justify-between w-full">
          <div className="bg-white/10 rounded-xl w-full px-10 py-8 space-y-6">
            {/* Recent Project */}
            <h2 className="text-xl font-extrabold text-white">
              Recent Project
            </h2>
            <div className="grid grid-cols-5 w-full gap-5">
              {projects.length > 0 &&
                projects
                  .slice(0, 5)
                  .map((project, index: number) => (
                    <Project
                      key={index}
                      id={project.board_id}
                      title={project.title}
                      creator={project.creator.username}
                      boardPicture={project.board_picture}
                    />
                  ))}
            </div>

            {/* Calendar and Comments */}
            <div className="grid grid-cols-2 w-full gap-10 pt-3">
              <div className="flex flex-col gap-3 bg-white/10 w-full h-[40rem] rounded-xl pt-8 px-8">
                <h2 className="text-2xl font-extrabold text-white">Calendar</h2>
                <div className="space-y-5 overflow-y-scroll pb-5 pt-2">
                  {cards.map((card) => (
                    <CalendarTask
                      key={card.card_id}
                      title={card.card_name}
                      description={card.description}
                      date={card.endDate}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5 bg-white/10 w-full h-[40rem] rounded-xl pt-8 px-8">
                <h2 className="text-2xl font-extrabold text-white">Comments</h2>
                <div className="space-y-5 overflow-y-scroll pb-5">
                  {cards.map((card) =>
                    card.comments.map((comment, index) => (
                      <Highlight
                        key={index}
                        text={comment.comment_text}
                        user={comment.users}
                      />
                    ))
                  )}
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
