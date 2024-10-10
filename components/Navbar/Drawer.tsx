"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";

function Drawer({ children, user }: { children: React.ReactNode; user: any }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          {user && pathname !== "/reset-password" && <Navbar user={user} />}
          {/* Content */}
          {children}
        </div>
        <div className="drawer-side z-[500]">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 text-xl gap-4  font-bold  pt-5">
            {/* Arrow */}
            <div className="flex justify-between items-center px-2">
              <Image
                src="/LogoWithTitle.svg"
                width={130}
                height={130}
                alt="Logo"
              />
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="btn btn-circle btn-ghost hover:bg-primary/50"
              >
                <i className="fa-solid fa-chevron-left fa-xl"></i>
              </label>
            </div>
            <div className="border-t-2 border-white mb-3"></div>
            {/* --------- Content sidebar --------- */}
            <li>
              {/* ---------- Homepage -------------- */}
              <Link
                onClick={toggleDrawer}
                href="/"
                className="hover:bg-primary hover:text-white"
              >
                <span>
                  <i className="fa-solid fa-house py-2 mr-4"></i>
                  Homepage
                </span>
              </Link>
            </li>
            <li>
              {/* ------------- ProjectPage ---------------- */}
              <Link
                onClick={toggleDrawer}
                href="/my-projects"
                className="hover:bg-primary hover:text-white"
              >
                <span>
                  <i className="fa-regular fa-floppy-disk py-2 mr-4"></i>Project
                </span>
              </Link>
            </li>
            <li>
              {/* ------------ Calendar ------------- */}
              <Link
                onClick={toggleDrawer}
                href="/calendar"
                className="hover:bg-primary hover:text-white"
              >
                <span>
                  <i className="fa-solid fa-calendar-days py-2 mr-4"></i>
                  Calendar
                </span>
              </Link>
            </li>
            <li>
              {/* ------------ SettingPage -------------- */}
              <a
                onClick={toggleDrawer}
                className="hover:bg-primary hover:text-white"
              >
                <span>
                  <i className="fa-solid fa-gear py-2 mr-4"></i>Setting
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Drawer;
