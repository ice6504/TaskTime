import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <FetchDataSteps />
        </main>
      </div>
    </div>
  );
}
