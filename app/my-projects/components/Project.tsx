import { FC } from "react";
import Link from "next/link";

interface Props {
  title: string;
  creator: string;
}

const Project: FC<Props> = ({ title, creator }) => {
  return (
    <Link
      href="/"
      className={`h-60 rounded-xl relative bg-[url('https://apwqaytxolzmkspbehub.supabase.co/storage/v1/object/public/attachments/img.jpeg')] bg-cover bg-center hover:brightness-110 hover:scale-105 transition-all duration-100 ease-in`}
    >
      <div className="bg-base-100/60 backdrop-blur-sm h-16 rounded-b-xl absolute inset-x-0 bottom-0 py-2 px-3">
        <p className="font-bold text-white">{title}</p>
        <p className="font-medium">{creator}</p>
      </div>
    </Link>
  );
};

export default Project;
