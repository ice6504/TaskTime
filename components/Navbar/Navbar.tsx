"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "./SignOut";
import Image from "next/image";
import Link from "next/link";

const Navbar = (user: any) => {
  const supabase = createClient();
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [avatar, setAvatar] = useState<null | string>(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setBackgroundColor(true);
    } else {
      setBackgroundColor(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!avatar) {
      const getAvatarUrl = async () => {
        const { data } = await supabase
          .from("users")
          .select("avatar_url")
          .eq("id", user.user.id)
          .single();

        if (data) {
          setAvatar(data.avatar_url);
        }
      };

      getAvatarUrl();
    }
  }, [avatar, user.user.id, supabase]);
  console.log("Avatar :", avatar);

  return (
    user && (
      <div
        className={`navbar fixed top-0 inset-x-0 z-[100] transition-colors duration-200 ${
          backgroundColor && "bg-primary/20 backdrop-blur-sm"
        }`}
      >
        <div className="navbar-start space-x-2">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost hover:bg-white/15 text-white"
          >
            <i className="fa-solid fa-bars fa-xl"></i>
          </label>
          <Link href="/">
            <Image
              className="active:scale-95 transition-all duration-150 cursor-pointer"
              src="/Title.svg"
              width={70}
              height={70}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="navbar-end">
          {/* Bell */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-sm btn-ghost text-white"
            >
              <i className="fa-regular fa-bell fa-xl"></i>
            </div>
            <div
              tabIndex={0}
              className="menu dropdown-content bg-base-100/25 backdrop-blur-sm font-bold rounded-box z-[20] mt-5 w-80 px-2 py-5 shadow"
            >
              <div className="flex flex-col h-80">
                <h2 className="text-[1.6rem] text-white font-extrabold mx-4">
                  Notification
                </h2>
                <div className="border-b-2 border-white my-4 mx-3"></div>
                <div className="grid place-content-center h-full">
                  <div className="flex flex-col items-center">
                    <Image
                      className="active:scale-95 transition-all duration-75 cursor-pointer"
                      src="/Mascot.svg"
                      width={200}
                      height={200}
                      alt="Logo"
                    />
                    <h3 className="text-center text-xl text-white">
                      No unread notifications
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profile */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                className={`w-8 rounded-full bg-gray-400 ${
                  !user.user.user_metadata.avatar_url || (!avatar && "skeleton")
                }`}
              >
                {(avatar || user.user.user_metadata.avatar_url) && (
                  <Image
                    src={
                      user.user.user_metadata.avatar_url
                        ? user.user.user_metadata.avatar_url
                        : avatar!
                    }
                    alt="avatar"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100/25 backdrop-blur-sm font-bold rounded-box z-[20] mt-3 w-52 p-2 shadow text-white"
            >
              <li>
                <a>
                  <i className="fa-solid fa-user"></i> Profile
                </a>
              </li>
              <li>
                <a>
                  <i className="fa-solid fa-gear"></i> Settings
                </a>
              </li>
              <li>
                <form action={signOut} className="hover:bg-error">
                  <button>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
