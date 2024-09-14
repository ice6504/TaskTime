import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center h-screen w-screen px-32">
      <div className="w-2/3 flex justify-center">
        <Image
          src="/Title.svg"
          alt="TaskTime"
          width={750}
          height={750}
          priority
        />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
