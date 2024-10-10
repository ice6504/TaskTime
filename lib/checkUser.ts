import { createClient } from "@/utils/supabase/server";

export async function checkUser() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    return user;
  } catch (error) {
    console.log(error);
  }
}
