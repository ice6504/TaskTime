"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const register = async (prevState: any, formData: FormData) => {
  try {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
      return { message: "Could not register user" };
    }

    // if (data.user) {
    //   const { error: insertError } = await supabase.from("users").insert({
    //     id: data.user.id,
    //     email: data.user.email,
    //     username: username,
    //   });

    //   if (insertError) {
    //     console.log("error", insertError);
    //     return { message: "Could not register user" };
    //   }
    // }
    return { success: true };
  } catch (error) {
    console.log("server error", error);
    return { message: "Server error" };
  }
};
