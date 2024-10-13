import Image from "next/image";

interface User {
  id: string;
  username: string;
  avatar_url: string;
  email: string;
}

function Member({ data, creator,board_id }: { data: User; creator: string; board_id:string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <div className="avatar size-12 relative">
          <Image
            className="rounded-full"
            src={data.avatar_url}
            alt={data.username}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-xl">{data.username}</h2>
          <p className="text-xs font-semibold">
            Workspace {data.id == creator ? "Admin" : "Member"}
          </p>
        </div>
      </div>
      <div className="border-2 border-primary rounded-2xl text-center text-lg w-24 py-2 font-bold">
        {data.id == creator ? "Admin" : "Member"}
      </div>
    </div>
  );
}

export default Member;
