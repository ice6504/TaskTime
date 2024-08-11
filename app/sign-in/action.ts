"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const logIn = async (formData: FormData) => {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  // const { error } = await supabase.auth.signInWithPassword();

  if (error) {
    console.error(error);
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/protected");
};
