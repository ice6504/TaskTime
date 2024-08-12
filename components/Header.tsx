import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col">
      <div>
        <Image
          src="/Mascot&Title.svg"
          alt="TaskTime Logo"
          priority
          width={800}
          height={800}
        />
        <div className="mx-20">
          <h1 className="text-3xl font w-1/2 text-white">
            if you wanna management your event , work, study you can try for
            free now!!
          </h1>
          <Link
            href="/sign-up"
            className="btn btn-secondary font-black w-48 h-16 rounded-full my-8 text-2xl shadow-secondary/70 shadow-md hover:bg-white/70 hover:text-secondary duration-200"
          >
            Get Start
          </Link>
        </div>
      </div>
    </div>
  );
}
