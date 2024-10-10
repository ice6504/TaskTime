import HeaderBar from "./components/HeaderBar";
import Link from "next/link";

function layoutProjects({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-5 pt-20 pb-5 px-4">
        <HeaderBar />
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flex flex-col bg-white/10 rounded-xl w-full px-10 py-8 h-screen">
            <div className="flex gap-3">
              <Link href="/projects" className="btn btn-primary w-28">
                <i className="fa-regular fa-file-lines"></i> Board
              </Link>
              <Link href="/timeline" className="btn btn-primary w-28">
                <i className="fa-regular fa-clock"></i> Timeline
              </Link>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between mb-5">
              <div className="flex items-center p-4 w-1/2 bg-black/30 rounded-xl">
                <h2 className="font-bold text-white">BNK-48 Event handshake</h2>
                <span className="ml-3 text-sm">(10 tasks)</span>
              </div>
              <button className="btn bg-black/50 font-bold h-14">
                <i className="fa-solid fa-user-check"></i> Mytask
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default layoutProjects;
