import { createClient } from "@/utils/supabase/server";
import Drawer from "./Drawer";

const DrawerWrapper = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Drawer user={user}>{children}</Drawer>;
};

export default DrawerWrapper;
