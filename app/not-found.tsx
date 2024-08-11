import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-grid-white w-full">
      <div className="absolute left-[-20vw] top-[10vh] h-[8px] w-[8px] rounded-full bg-pink-400 sm:left-[30vw] sm:h-[10px] sm:w-[10px]"></div>
      <div className="absolute left-[-20vw] top-[80vh] h-[8px] w-[8px] rounded-full bg-white sm:left-[70vw] sm:size-3"></div>
      <div className="absolute left-[-20vw] top-[18vh] h-[8px] w-[8px] rounded-full bg-red-400 sm:left-[60vw] sm:size-[20px]"></div>
      <div className="absolute left-[73vw] top-[30vh] h-[8px] w-[8px] rounded-full bg-yellow-400 sm:left-[80vw] sm:top-[50vh] sm:h-[10px] sm:w-[10px]"></div>
      <div className="absolute left-[17vw] top-[50vh] h-[8px] w-[8px] rounded-full bg-lime-400 sm:left-[12vw] sm:top-[53vh] sm:size-[13px]"></div>
      <div className="absolute left-[87vw] top-[78vh] h-[8px] w-[8px] rounded-full bg-violet-400 sm:top-[88vh] sm:h-[20px] sm:w-[20px]"></div>
      <div className="absolute left-[36vw] top-[90vh] h-[8px] w-[8px] rounded-full bg-blue-400 sm:top-[90vh] sm:size-[8px]"></div>
      <Image
        className="absolute right-0"
        src="/static/deco1.png"
        height={500}
        width={500}
        alt="deco"
      />
      <Image
        className="absolute left-0 bottom-0"
        src="/static/deco2.png"
        height={400}
        width={400}
        alt="deco"
      />

      <div className="grid place-items-center h-screen text-white">
        <div className="flex flex-col items-center gap-3 bg-white/20 ring-1 ring-white p-20 rounded-xl backdrop-blur-sm">
          <Image src="/notfound.svg" width={100} height={100} alt="not found" />
          <h2 className="text-xl font-semibold ">
            This content does not exist
          </h2>
          <Link href="/" className="btn btn-primary btn-sm mt-2">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
