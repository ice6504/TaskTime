"use server";
import { createClient } from "@/utils/supabase/server";

export async function createBoard(formData: FormData) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error getting user:", userError?.message);
      return { message: "User not authenticated", error: userError };
    }

    const projectName = formData.get("title") as string;
    const selectedColor = formData.get("color") as string;
    const selectedImage = formData.get("image") as File | null;
    const visibility = formData.get("is_public") as string;
    const isPublic = visibility === "true";

    let boardPicture: string; 

    const { data: boardData, error: insertError } = await supabase
      .from("boards")
      .insert([
        {
          title: projectName,
          is_public: isPublic,
          creator: user.id,
        },
      ])
      .select("board_id");

    if (insertError || !boardData || boardData.length === 0) {
      console.error("Error inserting board:", insertError?.message);
      return { message: "Error creating board", error: insertError };
    }

    const boardId = boardData[0].board_id;

    const generateColorPlaceholderUrl = (color: string) => {
      const encodedColor = encodeURIComponent(color);
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${encodedColor}"/></svg>`;
    };

    if (selectedImage  && selectedImage instanceof File) {
      const filePath = `${boardId}/cover`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("boards")
        .upload(filePath, selectedImage);

      if (uploadError) {
        console.error("Error uploading file", uploadError.message);
        return { message: "Cannot upload avatar", error: uploadError };
      }

      const { data: publicUrlData } = supabase.storage
        .from("boards")
        .getPublicUrl(filePath);

      boardPicture = publicUrlData.publicUrl;
    } else {
      boardPicture =
        selectedImage ||
        generateColorPlaceholderUrl(selectedColor);
    }

    const { error: updateError } = await supabase
      .from("boards")
      .update({ board_picture: boardPicture })
      .eq("board_id", boardId);

    if (updateError) {
      console.error("Error updating board with picture:", updateError.message);
      return { message: "Error updating board picture", error: updateError };
    }

    return boardData;
  } catch (error) {
    console.error("Error creating board:", error);
    throw new Error("Failed to create board");
  }
}
