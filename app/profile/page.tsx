"use client";
import React, { FC, useState, useEffect } from "react";
import Editbg from "./components/Editbg";
import EditPf from "./components/EditPf";
import { createClient } from "@/utils/supabase/client";

const Page: FC = () => {
  const supabase = createClient();
  const [users, setUsers] = useState<any>([]);
  const [boards, setBoards] = useState<any>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // number เก็บค่า user_id

  
  // ฟังก์ชันดึงข้อมูลผู้ใช้
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");

    //ถ้ามี error ให log ออกมา
    if (error) {
      console.log("error", error);
    } else {
      setUsers(data);

      // ดึงข้อมูลจาก boards
      if (data.length > 0) {
        setSelectedUserId(data[0].id); //บันทึก user_id
        console.log(data);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ฟังก์ชันดึงข้อมูล boards โดยใช้ user_id ที่เป็น foreing key ใน tables บอร์ด
  const fetchBoards = async (userId: number) => {
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("creator", userId); // กรองข้อมูล ว่ามี userId นี้ ใน creator ไหม

    if (error) {
      console.log("error", error); //ถ้ามี error log ออกมา
    } else {
      setBoards(data); //ถ้าไม่มี บันทึกข้อมูลที่ดึงมา ไว้ใน setBoards
    }
  };

  useEffect(() => {
    if (selectedUserId !== null) {
      //ตรวจสอบ ว่ามีค่า ไม่เป็น null
      fetchBoards(selectedUserId); // เเล้วก็จะเรียกใช้ function
    }
  }, [selectedUserId]); // ถ้า selectedUserId มีการเปลี่ยนเเปลง จะเรียกใช้ fucntion in useEffect
   
  console.log(users[0].facebookurl)
  return (
    <div className="w-full mt-10">
      {/* Components edit background */}

      <Editbg />

      <div className="flex flex-col items-center px-4 justify-between gap-5 pb-2">
        <div className="bg-white/10 rounded-b-lg w-full px-10 pb-10">
          <div className="flex items-center justify-between gap-10 pt-10"></div>

          {/* Components edit profile */}

          <EditPf />

          {/* content */}
          <div>
            <div className="flex items-center justify-between gap-5 pt-10">
              <div className="bg-white/10 rounded-xl h-80 w-full py-5">
                <h1 className="text-2xl font-extrabold px-10 pb-10 text-white">
                  About me
                  <div className="py-3 flex justify-between gap-10">
                    <div className="bg-black/20 rounded-xl w-full h-56 px-10 pt-10"> // about me น่าจะต้องเเก้
                      {users.map((user: any) => (
                        <p key={user.id}>{user.bio}</p>
                      ))}
                    </div>

                    {/* link FB and IG */}
                    <div className="flex flex-col gap-4 w-72">
                      <div className="bg-black/20 flex rounded-xl flex-col w-full h-16 px-2 hover:bg-primary hover:scale-110 duration-150">
                        <div className="flex justify-center gap-5 mt-3 items-center">
                          <img
                            src="FB.svg"
                            alt="facebook"
                            className="w-10 h-10"
                          />
                          <div className="">
                            {users.map((user: any) => (
                              <a
                                key={user.id}
                                href={user.facebookurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-extrabold"
                              >
                                Facebook
                              </a>
                            ))}
                          </div>
                          <i className="fa-solid fa-arrow-up-right-from-square text-xl"></i>
                        </div>
                        
                      </div>
                      <div className="bg-black/20 flex rounded-xl flex-col w-full h-16 px-2 hover:bg-primary hover:scale-110 duration-150">
                        <div className="flex justify-center gap-5 mt-3 items-center">
                          <img
                            src="IG.svg"
                            alt="instargram"
                            className="w-10 h-10"
                          />
                          <div className="">
                            {users.map((user: any) => (
                              <a
                                key={user.id}
                                href={user.instagramurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl font-extrabold"
                              >
                                Instargram
                              </a>
                            ))}
                          </div>
                          <i className="fa-solid fa-arrow-up-right-from-square text-xl"></i>
                        </div>
                        
                      </div>
                    </div>
                    
                  </div>
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10 pt-10">
              <div className="bg-white/10 rounded-xl h-80 w-full py-5">
                <h1 className="text-2xl font-extrabold px-10 pb-10 text-white">
                  My project
                  <div className="flex flex-col gap-4 w-72 pt-5">
                    {boards.length > 0 ? (
                      boards.map((board: any) => (
                        <div className="bg-black/20 flex rounded-xl flex-col w-fit h-16 px-2">
                          <div className="flex p-4 justify-around w-fit items-center">
                            <div className="text-xl flex">
                              <p key={board.board_id}>{board.title}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p></p> // แสดงข้อความหากไม่มีข้อมูล
                    )}
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
