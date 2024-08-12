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
          className="fixed right-0"
          src="/static/deco1.png"
          height={1000}
          width={1000}
          alt="deco"
        />
        <div className="size-12 absolute top-[40vh] left-[50vw]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33 33"
            fill="none"
          >
            <g clip-path="url(#clip0_1796_13861)">
              <path
                d="M3.12213 13.1391C11.6955 17.5307 13.0734 19.7673 13.14 29.3997C17.5316 20.8264 19.7682 19.4485 29.4006 19.3819C20.8273 14.9903 19.4494 12.7537 19.3827 3.12129C14.9911 11.6946 12.7546 13.0725 3.12213 13.1391Z"
                fill="white"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1796_13861">
                <rect
                  width="27.0098"
                  height="27.0098"
                  fill="white"
                  transform="matrix(-0.972923 -0.23113 -0.23113 0.972923 32.5215 6.24219)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute left-[-20vw] top-[10vh] h-[8px] w-[8px] rounded-full bg-pink-400 sm:left-[20vw] sm:h-[10px] sm:w-[10px]"></div>
        <div className="absolute left-[-20vw] top-[80vh] h-[8px] w-[8px] rounded-full bg-white sm:left-[70vw] sm:size-3"></div>
        <div className="absolute left-[-20vw] top-[10vh] h-[8px] w-[8px] rounded-full bg-red-400 sm:left-[60vw] sm:size-[20px]"></div>
        <div className="absolute left-[73vw] top-[30vh] h-[8px] w-[8px] rounded-full bg-yellow-400 sm:left-[80vw] sm:top-[50vh] sm:h-[10px] sm:w-[10px]"></div>
        <div className="absolute left-[17vw] top-[50vh] h-[8px] w-[8px] rounded-full bg-lime-400 sm:left-[3vw] sm:top-[53vh] sm:size-[13px]"></div>
        <div className="absolute left-[87vw] top-[78vh] h-[8px] w-[8px] rounded-full bg-violet-400 sm:top-[88vh] sm:h-[20px] sm:w-[20px]"></div>
        <div className="absolute left-[36vw] top-[90vh] h-[8px] w-[8px] rounded-full bg-blue-400 sm:top-[90vh] sm:size-[8px]"></div>
      </div>
      <div className="w-full flex flex-col bg-grid-white bg-fixed gap-8 ">
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
      </div>
      <Footer />
      <Image
        className="fixed left-0 z-0"
        src="/static/deco2.png"
        height={800}
        width={800}
        alt="deco"
      />
    </>
  );
}
