// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { useUser } from "@/hooks/useUser";
// import CommentCard from "../(projects)/components/Modal/CommentCard";

// interface Comment {
//   comment_id: number;
//   comment_text: string;
//   comment_date: string;
//   card_id: number;
//   users: {
//     username: string;
//   };
// }

// export default function Comments({ cardId }: { cardId: number }) {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const supabase = createClient();
//   const User = useUser();

//   const addComment = async (newComment: string, cardId: number) => { // เพิ่ม cardId เป็น parameter
//     if (!newComment.trim()) return;

//     if (!User) {
//       console.error("User is not logged in");
//       return;
//     }

//     const { error } = await supabase
//       .from("comments")
//       .insert([
//         {
//           comment_text: newComment,
//           user_id: User.id,
//           card_id: cardId, // ส่ง card_id ที่นี่
//         },
//       ]);

//     if (error) console.error("Error adding comment: ", error);
//   };

//   useEffect(() => {
//     const fetchComments = async () => {
//       let { data: comments, error } = await supabase
//         .from("comments")
//         .select(`
//           comment_id,
//           comment_text,
//           comment_date,
//           card_id,
//           users (username)
//         `)
//         .eq("card_id", cardId) // ดึงคอมเมนต์เฉพาะของการ์ดนี้
//         .order("comment_date", { ascending: false });

//       if (error) console.error("Error fetching comments: ", error);
//       else setComments(comments);
//     };

//     fetchComments();
//   }, [cardId]); // เพิ่ม cardId เป็น dependency เพื่อให้ดึงข้อมูลเมื่อ cardId เปลี่ยนแปลง

//   return (
//     <div>
//       <CommentCard onSave={addComment} cardId={cardId} /> {/* ส่ง cardId ไปที่ CommentCard */}
//     </div>
//   );
// }
