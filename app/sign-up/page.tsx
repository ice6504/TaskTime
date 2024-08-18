"use client";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { register } from "./action";

interface FormState {
  success: boolean;
  message: null | string;
}

const initialState: FormState = {
  success: false,
  message: null,
};

function formReducer(state: FormState, action: Partial<FormState>): FormState {
  return { ...state, ...action };
}

export default function SignUpPage() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirm && confirm !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
    if (password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  };

  function toggleVisibility() {
    setOpen(!open);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await register(state, formData);
    dispatch(result);
  };

  return (
    <>
      <div className="flex justify-between items-center h-screen w-screen px-32 z-[1]">
        <button
          onClick={() => router.back()}
          className="absolute top-3 left-3 border z-[2] btn btn-ghost"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <div className="w-2/3 flex justify-center">
          <Image
            src="/Title.svg"
            alt="TaskTime"
            width={750}
            height={750}
            priority
          />
        </div>
        <div className="grow bg-white/10 backdrop-blur-sm rounded-3xl py-16 px-10">
          <h2 className="text-3xl font-bold text-white mb-10">SIGN UP</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <label className="input rounded-3xl flex items-center px-6 gap-4  bg-white text-black text-md">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="text"
                className="grow placeholder:font-medium"
                name="email"
                placeholder="Email"
                required
              />
            </label>
            {/* Username */}
            <label className="input rounded-3xl flex items-center px-6 gap-4  bg-white text-black text-md">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                className="grow placeholder:font-medium"
                name="username"
                placeholder="Username"
                required
              />
            </label>
            {/* Password */}
            <label className="input rounded-3xl flex items-center px-6 gap-4  bg-white text-black text-md">
              <i className="fa-solid fa-lock"></i>
              <input
                onChange={handlePasswordChange}
                type={open ? "text" : "password"}
                name="password"
                className="grow placeholder:font-medium"
                placeholder="Password"
                required
              />
              <div
                onClick={toggleVisibility}
                className="btn btn-ghost btn-circle btn-sm text-black"
              >
                <i
                  className={`fa-solid ${open ? "fa-eye" : "fa-eye-slash"} `}
                ></i>
              </div>
            </label>
            {/* Confirm Password */}
            <div>
              <label className="input rounded-3xl flex items-center px-6 gap-4  bg-white text-black text-md">
                <i className="fa-solid fa-key"></i>
                <input
                  onChange={handleConfirmChange}
                  type={open ? "text" : "password"}
                  className="grow placeholder:font-medium"
                  placeholder="Confirm Password"
                  required
                />
                <div
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className="btn btn-ghost btn-circle btn-sm text-black"
                >
                  <i
                    className={`fa-solid ${open ? "fa-eye" : "fa-eye-slash"} `}
                  ></i>
                </div>
              </label>
              {error && <p className="text-error px-2 mt-2">{error}</p>}
              {state.message && (
                <p className="text-error px-2 mt-2">Error: {state.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-md btn-primary rounded-full w-full font-bold"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-end pt-7 ">
            <Image src="/Mascot.svg" alt="Mascot" height={100} width={100} />
          </div>
        </div>
      </div>
      {state.success && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box bg-primary-content flex flex-col items-center justify-center h-96">
            <h3 className="flex justify-center ">
              <div className="size-20 ring-4 ring-white flex justify-center items-center rounded-full text-5xl text-white">
                <i className="fa-solid fa-envelope"></i>
              </div>
            </h3>
            <h3 className="font-bold text-xl text-center pt-3 text-white">
              Register Successful!
            </h3>
            <div className="divider px-5 my-3"></div>
            <p className="px-5 mb-5">
              In order to start using your TaskTime account, you need to confirm
              your email address.
            </p>
            <a
              href="https://mail.google.com"
              className="btn btn-secondary font-bold rounded-md link"
            >
              Verify Email Address
            </a>
          </div>
        </dialog>
      )}
    </>
  );
}
