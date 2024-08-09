import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("notes").select("*");
  

  return (
    <div>
      <ol className="list-decimal">
        {data?.map((note) => {
        return <li key={note.id}>{note.title}</li>
        })}
      </ol>
    </div>
  );
}
