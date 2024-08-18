import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BgNav from "./BgNav";

const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server"
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    user && (
      <BgNav>
        <div className="flex-1 space-x-2">
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
        <div className="flex-none gap-1">
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
              className="btn btn-ghost btn-circle avatar hover:bg-transparent"
            >
              <div className="w-8 rounded-full skeleton bg-gray-400">
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  width={20}
                  height={20}
                />
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
      </BgNav>
    )
  );
};

export default Navbar;
