"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/hooks/useUser";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const supabase = createClient();
  const User = useUser();

  // ดึงข้อมูลคอมเมนต์ทั้งหมดเมื่อหน้าโหลดครั้งแรก
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
      console.log(comments); 
    };

    fetchComments();

    // Subscribe เพื่ออัปเดตคอมเมนต์แบบเรียลไทม์
    const commentListener = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        async (payload) => {
          console.log("New comment added: ", payload.new);

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
      .on(
        "postgres_changes", 
        { event: "DELETE", schema: "public", table: "comments" }, 
        (payload) => {
          console.log("Comment deleted: ", payload.old);

          setComments((currentComments) =>
            currentComments.filter(
              (comment) => comment.comment_id !== payload.old.comment_id
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentListener);
    };
  }, []);

  // ฟังก์ชันสำหรับเพิ่มคอมเมนต์
  const addComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

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

    setNewComment("");
  };

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
      <form onSubmit={addComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
