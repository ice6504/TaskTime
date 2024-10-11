import HeaderBar from "../components/HeaderBar";

function layoutProjects({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-5 pt-20 pb-5 px-4">
        <HeaderBar />
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
