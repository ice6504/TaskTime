"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/hooks/useUser";
import CommentCard from "../(projects)/components/Modal/CommentCard";

export default function Comments() {
  const [comments, setComments] = useState<any[]>([]);
  const supabase = createClient();
  const User = useUser();

  // ฟังก์ชันสำหรับเพิ่มคอมเมนต์
  const addComment = async (newComment: string) => {
    if (!newComment.trim()) return;

    if (!User) {
      console.error("User is not logged in");
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert([
        {
          comment_text: newComment,
          user_id: User.id,
        },
      ]);

    if (error) console.error("Error adding comment: ", error);
  };

  useEffect(() => {
    const fetchComments = async () => {
      let { data: comments, error } = await supabase
        .from("comments")
        .select(`
          comment_id,
          comment_text,
          comment_date,
          users (username)
        `)
        .order("comment_date", { ascending: false });

      if (error) console.error("Error fetching comments: ", error);
      else setComments(comments);
    };

    fetchComments();

    const commentListener = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        async (payload) => {
          const { data: newComments, error } = await supabase
            .from("comments")
            .select(`
              comment_id,
              comment_text,
              comment_date,
              users (username)
            `)
            .eq("comment_id", payload.new.comment_id)
            .single();

          if (error) {
            console.error("Error fetching new comment: ", error);
          } else {
            setComments((currentComments) => [newComments, ...currentComments]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentListener);
    };
  }, []);

  return (
    <div>
      <h1>Realtime Comments</h1>
      <div style={{ height: "300px", overflowY: "scroll" }}>
        {comments.map((comment) => (
          <div key={comment.comment_id}>
            <strong>{comment.users?.username || "Unknown User"}: </strong>
            <span>{comment.comment_text}</span>
            <br />
            <small>{new Date(comment.comment_date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>

      {/* ใช้ CommentCard สำหรับเพิ่มคอมเมนต์ใหม่ */}
      <CommentCard onSave={addComment} />
    </div>
  );
}
