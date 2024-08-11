import Link from "next/link";
import Image from "next/image";

// Components
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <>
      <div className="absolute h-full w-full z-0">
        <Image
          className="absolute right-0"
          src="/static/deco1.png"
          height={1000}
          width={1000}
          alt="deco"
        />
        <div className="absolute left-[-20vw] top-[10vh] h-[8px] w-[8px] rounded-full bg-pink-400 sm:left-[20vw] sm:h-[10px] sm:w-[10px]"></div>
        <div className="absolute left-[-20vw] top-[60vh] h-[8px] w-[8px] rounded-full bg-white sm:left-[50vw] sm:size-3"></div>
        <div className="absolute left-[-20vw] top-[20vh] h-[8px] w-[8px] rounded-full bg-red-400 sm:left-[60vw] sm:size-[20px]"></div>
        <div className="absolute left-[73vw] top-[30vh] h-[8px] w-[8px] rounded-full bg-yellow-400 sm:left-[80vw] sm:top-[50vh] sm:h-[10px] sm:w-[10px]"></div>
        <div className="absolute left-[17vw] top-[50vh] h-[8px] w-[8px] rounded-full bg-lime-400 sm:left-[3vw] sm:top-[53vh] sm:size-[13px]"></div>
        <div className="absolute left-[87vw] top-[78vh] h-[8px] w-[8px] rounded-full bg-violet-400 sm:top-[88vh] sm:h-[20px] sm:w-[20px]"></div>
        <div className="absolute left-[36vw] top-[90vh] h-[8px] w-[8px] rounded-full bg-blue-400 sm:top-[90vh] sm:size-[8px]"></div>
      </div>
      <div className="w-full flex flex-col bg-grid-white gap-8 ">
        <div className="h-screen pt-7 z-[1]">
          <nav className="flex justify-end gap-3 px-5">
            <Link
              href="/sign-up"
              className="btn bg-white/50 hover:bg-white/50 w-32 font-black border-none rounded-3xl shadow-white/60 shadow-md hover:shadow-none"
            >
              Sign Up
            </Link>

            <Link
              href="/sign-in"
              className="btn btn-primary w-32 font-black border-none rounded-3xl shadow-md shadow-primary/60 hover:shadow-none"
            >
              Sign In
            </Link>
          </nav>
          <Header />
        </div>
        <Introduction />
        <Image
            className="absolute left-0 z-0"
            src="/static/deco2.png"
            height={1000}
            width={1000}
            alt="deco"
          />
      </div>
      <Footer />
    </>
  );
}
