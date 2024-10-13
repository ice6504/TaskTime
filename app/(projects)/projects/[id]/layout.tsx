import { createClient } from "@/utils/supabase/server";
import HeaderBar from "../../components/HeaderBar";

async function layoutProjects({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const supabase = createClient();

  let { data: boardMember } = await supabase
    .from("boards")
    .select(
      `
        creator,
        users!boardmember(id,username, avatar_url, email)
      `
    )
    .eq("board_id", params.id)
    .limit(1)
    .single();

  return (
    <>
      <div className="w-full flex flex-col items-center gap-5 pt-20 pb-5 px-4">
        {boardMember?.users && (
          <HeaderBar
            board_id={params.id}
            creator={boardMember.creator}
            member={boardMember.users}
          />
        )}
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flex flex-col bg-white/10 rounded-xl w-full px-10 py-8 h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default layoutProjects;
