import { FC } from "react";
import Link from "next/link";

interface Props {
  title: string;
  creator: string;
  boardPicture: string;
}

const Project: FC<Props> = ({ title, creator , boardPicture  }) => {
  return (
    <Link
      href="/"
      className={`h-60 rounded-xl relative bg-cover bg-center hover:brightness-110 hover:scale-105 transition-all duration-150 ease-in`}
      style={{ backgroundImage: `url('${boardPicture}')` }}
    >
      <div className="bg-base-100/60 backdrop-blur-sm h-16 rounded-b-xl absolute inset-x-0 bottom-0 py-2 px-3">
        <p className="font-bold text-white">{title}</p>
        <p className="font-medium">{creator}</p>
      </div>
    </Link>
  );
};

export default Project;
