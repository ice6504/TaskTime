import Image from "next/image";

const NoTask = ({ title }: { title: string }) => {
  return (
    <div className=" h-72 grid place-content-center">
      <div className="flex flex-col items-center gap-5">
        <Image src="/notfound.svg" width={120} height={120} alt="not found" />
        <h2 className="text-xl font-bold">
          {title === "upcoming"
            ? "No upcoming task right now."
            : "No past due tasks at the moment."}
        </h2>
      </div>
    </div>
  );
};

export default NoTask;
