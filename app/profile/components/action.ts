"use server";
import { createClient } from "@/utils/supabase/server";

export async function changeProfile(formData: FormData) {
  try {
    const avatar = formData.get("profile") as File | null;
    const username = formData.get("username") as string | null;
    const facebookUrl = formData.get("facebookUrl") as string | null;
    const instagramUrl = formData.get("instagramUrl") as string | null;
    const bio = formData.get("bio") as string | null;

    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error getting user:", userError?.message);
      return { message: "User not authenticated", error: userError };
    }

    // Prepare the data to update
    const updates: { [key: string]: string | null } = {};

    if (username) updates.username = username;
    updates.facebookUrl = facebookUrl !== undefined ? facebookUrl : null;
    updates.instagramUrl = instagramUrl !== undefined ? instagramUrl : null;
    updates.bio = bio || null;

    if (avatar) {
      const filePath = `${user.id}/avatar`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("users")
        .upload(filePath, avatar , {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error("Error uploading file", uploadError.message);
        return { message: "Cannot upload avatar", error: uploadError };
      }

      // Get the public URL for the uploaded avatar
      const { data: publicUrlData } = supabase.storage
        .from("users")
        .getPublicUrl(filePath);

      const avatarUrl = publicUrlData.publicUrl;
      updates.avatar_url = avatarUrl;
    }

    if (Object.keys(updates).length > 0) {
      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select();

      if (updateError) {
        console.error("Error updating profile", updateError.message);
        return { message: "Cannot update profile", error: updateError };
      }

      console.log("Profile updated successfully", updateData);
      return { message: "Profile updated successfully", data: updateData };
    } else {
      return { message: "Nothing to update" };
    }
  } catch (error) {
    console.log("server error", error);
    return { message: "Server error", error };
  }
}
