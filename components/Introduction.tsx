import Image from "next/image";

function Introduction() {
  return (
    <div className="z-[2]">
      {/* 1 */}
      <div className="flex items-center justify-between m-20">
        <div className="px-8 w-1/2">
          <h1 className="font-black text-5xl w-[500px] mb-7 text-white">
            Make Your Board & Assign Your Work
          </h1>
          <p className="text-xl w-[500px] text-white">
            You can make boards, lists, cards and set deadlines for your work.
            Now you have a plan to do your work!
          </p>
        </div>
        <Image
          className="rounded-xl shadow-black shadow-xl"
          src="/Assign_work.png"
          width={800}
          height={800}
          alt="Assign your work"
        />
      </div>
      {/* 2 */}
      <div className="flex items-center justify-between m-20">
        <Image
          className="rounded-xl shadow-black shadow-xl"
          src="/Calendar.png"
          width={800}
          height={800}
          alt="Calendar"
        />
        <div className="ml-28 w-1/2">
          <h1 className="font-black text-5xl mb-7 text-white">
            Calendar for your plan
          </h1>
          <p className="text-xl w-[400px]  text-white">
            Manage your time and projects with a fully integrated calendar for
            your tasks.
          </p>
        </div>
      </div>
      {/* How3 */}
      <div>
        <div className="flex justify-center mt-20 mb-8">
          <h1 className="font-black text-8xl text-white">
            Collaborate with others
          </h1>
        </div>
        <div className="flex justify-center mb-20">
          <Image
            className="rounded-xl shadow-primary/20 shadow-xl"
            src="/Collaborate.png"
            width={1000}
            height={1000}
            alt="Collaborate"
          />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
