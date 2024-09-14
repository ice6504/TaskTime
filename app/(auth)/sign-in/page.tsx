"use client";
import { createClient } from "@/utils/supabase/client";
import { signIn } from "./action";
import Image from "next/image";
import Link from "next/link";

// Components
import { SubmitButton } from "@/components/forms/submit-button";

function SignInPage({ searchParams }: { searchParams: { message: string } }) {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link
        href="/"
        className="absolute top-3 left-3 border z-[2] btn btn-ghost"
      >
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>
      <div className="grow bg-white/10 backdrop-blur-sm rounded-3xl py-16 px-10">
        <h2 className="text-3xl font-bold text-white mb-10">SIGN IN</h2>
        <form className="flex-1 flex flex-col w-full justify-center gap-6 text-foreground">
          {/* Email */}
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
          {/* Password */}
          <div>
            <label className="input rounded-3xl flex items-center px-6 gap-4 bg-white text-black text-md">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Password"
                required
              />
            </label>
            {searchParams?.message && (
              <p className="text-error w-full px-2 pt-2">
                {searchParams.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between my-2 px-2">
            <Link
              href="/forgot-password"
              className="text-sm link link-hover font-bold"
            >
              Forget Password ?
            </Link>
            <div className="w-40">
              <SubmitButton formAction={signIn} pendingText="Signing In...">
                Sign In
              </SubmitButton>
            </div>
          </div>
        </form>
        <div className="flex justify-center pt-16">
          <Link
            href="/sign-up"
            className="link link-hover text-sm text-white font-bold"
          >
            Create Your Account &nbsp;
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="divider my-6 font-bold">OR</div>
        {/* Google */}
        <div className="flex justify-center">
          <button
            onClick={signInWithGoogle}
            className="btn px-10 rounded-3xl bg-white text-black hover:bg-white/70 font-bold"
          >
            <Image
              src="/brands/Google.svg"
              alt="Google"
              width={30}
              height={30}
            />
            <p>Google</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
