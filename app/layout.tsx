import Image from "next/image";
import { Mulish } from "next/font/google";
import { Anuphan } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TaskTime",
  description: "The fastest way to build apps with Next.js and Supabase",
};

// Font
const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-mulish",
});

const anuphan = Anuphan({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--font-anuphan",
});

// Components
import DrawerWrapper from "@/components/Navbar/DrawerWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mulish.variable} ${anuphan.variable}`}>
      <body>
        <div className="fixed top-0">
          <Image
            className="fixed right-0"
            src="/static/deco1.png"
            priority
            height={1000}
            width={1000}
            alt="deco"
          />
          <Image
            className="fixed left-0"
            src="/static/deco2.png"
            priority
            height={800}
            width={800}
            alt="deco"
          />
        </div>
        <DrawerWrapper>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </DrawerWrapper>
      </body>
    </html>
  );
}
