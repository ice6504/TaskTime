"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { register } from "./action";

const initialState = {
  success: false,
  message: null,
};

function Signup() {
  const [state, formAction] = useFormState(register, initialState);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <>
      <div>
        <form action={formAction} className="pt-10">
          <label className="input rounded-3xl flex items-center px-6 gap-4 mb-4 bg-white text-black text-md">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="text"
              className="grow placeholder:font-medium"
              name="email"
              placeholder="Email"
              required
            />
          </label>

          <label className="input rounded-3xl flex items-center px-6 gap-4 mb-4 bg-white text-black text-md">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              className="grow placeholder:font-medium"
              name="username"
              placeholder="Username"
              required
            />
          </label>

          <label className="input rounded-3xl flex items-center px-6 gap-4 mb-4 bg-white text-black text-md">
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
              className="btn btn-ghost btn-circle btn-sm"
            >
              <i
                className={`fa-solid ${open ? "fa-eye" : "fa-eye-slash"} `}
              ></i>
            </div>
          </label>

          <label className="input rounded-3xl flex items-center px-6 gap-4 mb-4 bg-white text-black text-md">
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
              className="btn btn-ghost btn-circle btn-sm"
            >
              <i
                className={`fa-solid ${open ? "fa-eye" : "fa-eye-slash"} `}
              ></i>
            </div>
          </label>
          {error && <span className="text-error p-4">Error: {error}</span>}

          <button className="btn btn-md bg-primary border-none rounded-full w-full font-bold">
            Sign Up
          </button>
          {state.message && (
            <div className="bg-error p-4">Error: {state.message}</div>
          )}
          {state.success && (
            <div className="bg-green-500 p-4">Register Successful!</div>
          )}
        </form>
      </div>
    </>
  );
}

export default Signup;
