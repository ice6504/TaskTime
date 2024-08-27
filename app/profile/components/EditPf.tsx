"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // นำเข้า Supabase Client

export default function EditPf() {
  const supabase = createClient();
  const [about, setAbout] = useState<string>("");
  const [urlfacebook, setUrlFacebook] = useState<string>("");
  const [urlinstargram, setUrlInstargram] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const [name, setName] = useState<string>("");

  const fethUsers = async () => {
    let { data, error } = await supabase.from("users").select("*");

    if (!data || error) {
      console.log("error", error);
    }

    setUsers(data);
  };

  useEffect(() => {
    fethUsers();
  }, []);

  const UserId = users.length > 0 ? users[0].id : null;

  const PopUp = (event: any) => {
    event.preventDefault();
    setShowPopup(true);
  };

  const cancelSubmission = () => {
    setShowPopup(false);
  };

  const getCurrentUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }

    return data;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const currentUserData = await getCurrentUserData(UserId);

    if (!currentUserData) return;

    const updatedData = {
      username: name || currentUserData.username,
      facebookurl: urlfacebook || currentUserData.urlfacebook,
      instargramurl: urlinstargram || currentUserData.urlinstargram,
      bio : about || currentUserData.bio
    };

    const { data, error } = await supabase
      .from("users")
      .update(updatedData)
      .eq("id", UserId);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully:", data);
      setShowPopup(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex text-center items-center gap-3 ">
        <div className="dropdown ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar hover:bg-transparent"
          >
            <div className="w-40 rounded-full skeleton ">
              {users.map((user: any) => (
                <img key={user.id} src={user.avatar_url} alt="" />
              ))}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-primary backdrop-blur-sm font-bold rounded-box z-[100] mt-3 w-52 p-2 shadow text-white"
          >
            <li>
              <a>
                <i className="fa-solid fa-user"></i> Edit Profile
              </a>
            </li>
          </ul>
        </div>
        <div className="pl-4 text-white text-3xl font-bold w-full flex justify-between">
          <p className="">
            {users.map((user: any) => (
              <span key={user.id}>{user.username}</span>
            ))}
          </p>
          <form action="" className="relative" onSubmit={PopUp}>
            <button className="btn bg-primary rounded-full border-none hover:scale-110 duration-300">
              <i className="fa-solid fa-pencil text-xl"></i>
            </button>
          </form>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-50 z-50">
              <div className="w-[1000px] h-fit bg-white p-5 rounded-xl shadow-lg relative">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-4 mt-10 pr-10 top-2 text-black bg-[] text-2xl z-20 hover:text-primary"
                  onClick={cancelSubmission}
                >
                  ✕
                </button>
                <form className="relative" onSubmit={handleSubmit}>
                  <h1 className="text-4xl text-primary text-start w-fit p-8 font-extrabold">
                    Edit Profile
                  </h1>
                  <div className="flex flex-col items-start text-start text-black pt-3">
                    <div className="flex justify-between items-center gap-28">
                      <div className="w-fit px-10">
                        <div className="btn w-64 h-64 border-none ">
                         <p>เดี๋ยวทำ ขี้เกียจ</p>
                        </div>
                      </div>

                      <div className="flex  w-full items-center">
                        <div className="w-full flex flex-col gap-5">
                          <div className="flex w-[450px] h-fit items-center">
                            <h1 className="font-bold text-xl  pb-2 pr-16 mr-1">
                              Name:{" "}
                            </h1>
                            <input
                              type="text"
                              className="w-full h-[60px] font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          <div className="flex">
                            <div className="flex  pb-2 pr-4  items-center  justify-center">
                            <h1 className="font-bold text-xl pb-2 pr-5">
                              Facebook:{" "}
                            </h1>
                            </div>
                            <input
                              type="text"
                              className="w-full h-[60px] font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                              placeholder="Enter Url"
                              value={urlfacebook}
                              onChange={(e) => setUrlFacebook(e.target.value)}
                            />
                          </div>

                          <div className="flex">
                            <div className="flex  pb-2   items-center  justify-center">
                            <h1 className="font-bold text-xl pb-2 pr-5 ">
                              Instargram:{" "}
                            </h1>
                            </div>
                            <input
                              type="text"
                              className="w-full h-[60px] font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                              placeholder="Enter Url"
                              value={urlinstargram}
                              onChange={(e) => setUrlInstargram(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full pr-16 pl-11 mt-5">
                      <h1 className="font-extrabold text-2xl pb-2">About me</h1>
                      <textarea
                        placeholder="Enter something about you ...."
                        className="w-full h-[100px] resize-none font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="w-full px-16">
                      <div className="flex justify-end mt-20">
                        <button
                          type="submit"
                          className="btn font-extrabold bg-primary border-none rounded-lg text-white w-52 text-2xl"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                /div
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
