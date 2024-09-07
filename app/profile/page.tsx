"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import EditProfile from "./components/EditProfile";

const ProfilePage = () => {
  const supabase = createClient();
  const user = useUser();
  const [userData, setUserData] = useState<any>();
  const [editBio, setEditBio] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      const { data: userData, error } = await supabase
        .from("users")
        .select(
          `
          username, bio, facebookUrl, instagramUrl, avatar_url, cover_picture
          `
        )
        .eq("id", user.id)
        .limit(1)
        .single();

      if (error) throw error;
      if (userData) {
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadCoverPicture(file);
    }
  };

  const uploadCoverPicture = async (file: File) => {
    try {
      const filePath = `Cover_users/${uuidv4()}`;

      // Upload the cover picture to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("attachments")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading file", uploadError.message);
        return;
      }

      // Get the public URL for the uploaded cover picture
      const { data: publicUrlData } = supabase.storage
        .from("attachments")
        .getPublicUrl(filePath);

      const coverPictureUrl = publicUrlData.publicUrl;

      // Update the user's cover picture in the users table
      const { error: updateError } = await supabase
        .from("users")
        .update({ cover_picture: coverPictureUrl })
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating cover picture", updateError.message);
      } else {
        console.log("Cover picture updated successfully");
        // Refetch the user data to reflect the updated cover picture
        fetchUserData();
      }
    } catch (error) {
      console.error("Error uploading and updating cover picture:", error);
    }
  };

  const toggleModal = (shouldRefetch = false) => {
    setEditBio(!editBio);
    if (shouldRefetch) {
      fetchUserData();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full mt-20 mb-5 px-5">
        {/* Components edit background */}
        {/* <Editbg /> */}
        <div
          className="rounded-t-lg h-80 w-full py-5 bg-white relative"
          style={{
            backgroundImage: userData?.cover_picture
              ? `url(${userData.cover_picture})`
              : "",
          }}
        >
          <div className="absolute right-5 bottom-5">
            <form className="relative">
              <button
                className="btn w-80 bg-black/70 text-lg rounded-xl font-bold text-white relative z-10"
                type="button"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <i className="fa-regular fa-image mr-2"></i>
                Edit Background
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white/10 rounded-b-lg w-full space-y-10 p-10">
          <div className="flex items-center">
            <div className="grow flex items-center gap-10 pr-5">
              {/* Avatar */}
              <div className="size-36 rounded-full bg-white relative">
                <Image
                  className="rounded-full"
                  src={userData?.avatar_url}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Username */}
              <p className="grow text-white text-3xl font-bold line-clamp-1">
                {userData?.username}
              </p>
            </div>
            {/* Edit Profile */}
            <button
              onClick={() => toggleModal(false)}
              className="btn bg-primary btn-circle hover:bg-primary/70 hover:scale-110 duration-300"
            >
              <i className="fa-solid fa-pencil text-xl"></i>
            </button>
          </div>
          {/* About Me */}
          <div className="bg-white/10 rounded-xl w-full px-8 py-5 font-extrabold text-2xl text-white space-y-3">
            <h3>About me</h3>
            <div className="py-3 flex justify-between gap-8">
              <p className="grow bg-black/20 rounded-xl w-full h-56 p-10 line-clamp-4 white-space-pre-line">
                {userData?.bio}
              </p>

              {/* link FB and IG */}
              {(userData?.facebookUrl || userData?.instagramUrl) && (
                <div className="flex flex-col gap-4 w-72">
                  {userData?.facebookUrl && (
                    <a
                      href={userData.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-around gap-3 items-center px-6 py-3 rounded-xl bg-black/20 hover:bg-primary hover:scale-110 duration-150"
                    >
                      <Image
                        src="/brands/FB.svg"
                        alt="Facebook Logo"
                        width={40}
                        height={40}
                      />
                      <span>Facebook</span>
                    </a>
                  )}
                  {userData?.instagramUrl && (
                    <a
                      href={userData.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-around gap-3 items-center px-6 py-3 rounded-xl bg-black/20 hover:bg-primary hover:scale-110 duration-150"
                    >
                      <Image
                        src="/brands/IG.svg"
                        alt="Instagram Logo"
                        width={40}
                        height={40}
                      />
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/10 rounded-xl h-80 w-full py-5">
            <h1 className="text-2xl font-extrabold px-10 pb-10 text-white">
              My project
              <div className="flex flex-col gap-4 w-72 pt-5">
                {/* {boards.length > 0 ? (
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
                    )} */}
              </div>
            </h1>
          </div>
        </div>
      </div>

      {editBio && userData && (
        <EditProfile userData={userData} closeModal={toggleModal} />
      )}
    </>
  );
};

export default ProfilePage;
