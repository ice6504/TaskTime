"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function ResetPage() {
  const supabase = createClient();
  const [success, setSuccess] = useState<boolean>(false);

  const findUser = async (formData: FormData) => {
    const email = formData.get("email") as string;

    const { data: resetData, error } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.href}`,
      });
    console.log(resetData);
    if (error) {
      console.error(error);
    }
    setSuccess(true);
  };

  return (
    <>
      <div className="flex justify-between items-center h-screen w-screen px-32 z-[1]">
        <Link
          href="/sign-in"
          className="absolute top-3 left-3 border z-[2] btn btn-ghost"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
        <div className="w-2/3 flex justify-center">
          <Image
            src="/Title.svg"
            alt="TaskTime"
            width={750}
            height={750}
            priority
          />
        </div>
        <div className="grow bg-white/10 backdrop-blur-sm rounded-3xl py-16 px-10 min-h-[38rem] relative">
          <h2 className="text-3xl font-bold text-white mb-10">
            Forgot Password
          </h2>
          <form
            action=""
            className="flex-1 flex flex-col w-full justify-center gap-6 text-foreground"
          >
            {" "}
            {/* Email */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-white">Enter your email</span>
              </div>
              <label className="input rounded-3xl flex items-center px-6 gap-4 bg-white text-black text-md">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="text"
                  name="email"
                  className="grow"
                  placeholder="Email"
                  required
                />
              </label>
            </label>
            <div className="flex justify-end">
              <button
                formAction={findUser}
                type="submit"
                className="btn btn-md btn-primary rounded-full w-40 font-bold"
              >
                Reset Password
              </button>
            </div>
          </form>
          <div className="absolute bottom-5 right-5">
            <Image src="/Mascot.svg" alt="Mascot" height={120} width={120} />
          </div>
        </div>
      </div>
      {success && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box bg-primary-content flex flex-col items-center justify-center h-96">
            <div className="flex justify-center ">
              <div className="size-20 ring-4 ring-white flex justify-center items-center rounded-full text-4xl text-white">
                <i className="fa-solid fa-unlock"></i>
                {/* <i className="fa-solid fa-key"></i> */}
              </div>
            </div>
            <h3 className="font-bold text-xl text-center pt-3 text-white">
              Reset your password
            </h3>
            <div className="divider px-5 my-3"></div>
            <p className="px-5 mb-5">
              If the account exist, we will email you instructions to reset the
              password.
            </p>
            <a
              href="https://mail.google.com"
              className="btn btn-secondary font-bold rounded-md link"
            >
              Check your email
            </a>
          </div>
        </dialog>
      )}
    </>
  );
}

export default ResetPage;
