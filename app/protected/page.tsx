import Header from "@/components/Header";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center pt-20 px-20">
      <Header />
      <div className="bg-white/30 w-full h-96"></div>
    </div>
  );
}
