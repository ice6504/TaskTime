"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { changeProfile } from "./action";

interface Props {
  userData: any;
  closeModal: (shouldRefetch: boolean) => void;
}

const EditProfile: FC<Props> = ({ userData, closeModal }) => {
  const [username, setUsername] = useState(userData.username || "");
  const [facebookUrl, setFacebookUrl] = useState(userData.facebookUrl || "");
  const [instagramUrl, setInstagramUrl] = useState(userData.instagramUrl || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Set the preview of the image
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64)
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("facebookUrl", facebookUrl || "");
    formData.append("instagramUrl", instagramUrl || "");
    formData.append("bio", bio || "");

    // Check if a new profile picture is being uploaded
    if (event.currentTarget.profile?.files?.[0]) {
      formData.append("profile", event.currentTarget.profile.files[0]);
    }

    try {
      // Call the server-side action to update the profile
      const response = await changeProfile(formData);

      if (response?.data) {
        closeModal(true); // Trigger re-fetch in parent
      } else {
        console.error("Error updating profile:", response?.error);
      }
    } catch (error) {
      console.error("An error occurred during profile update:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <>
      <dialog className="modal modal-open">
        <div className="modal-box max-w-[50rem] z-[500] h-fit max-h-fit bg-white p-5 rounded-xl text-black">
          <button
            onClick={() => closeModal(false)}
            className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
          >
            <i className="fa-solid fa-xmark fa-xl"></i>
          </button>
          <h1 className="text-4xl font-extrabold pt-5 px-5">
            Edit Profile
          </h1>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="flex gap-5 w-full">
              {/* Upload Profile */}
              <div className="w-2/5 relative">
                <label className="input rounded-xl flex flex-col justify-center items-center w-full h-64 bg-black/30 text-white text-md text-center hover:cursor-pointer">
                  {selectedImage ? (
                    <Image
                      className="rounded-xl"
                      src={selectedImage}
                      alt="Avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <>
                      <i className="fa-regular fa-image text-3xl"></i>
                      <div className="text-xl font-bold mt-3">
                        Upload Profile
                      </div>
                    </>
                  )}
                  <input
                    hidden
                    type="file"
                    name="profile"
                    accept="image/*"
                    onChange={handleImageChange} // Handle the file input change
                  />
                </label>
              </div>
              {/* Edit info */}
              <div className="flex flex-col gap-5 justify-center w-3/5">
                <div className="flex gap-5 items-center">
                  <span className="font-bold text-xl w-44">Name : </span>
                  <input
                    type="text"
                    name="username"
                    className="w-full h-[60px] font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                    maxLength={30}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div className="flex gap-5 items-center">
                  <span className="font-bold text-xl w-44">Facebook : </span>
                  <input
                    type="text"
                    name="facebookUrl"
                    className="w-full h-[60px] font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                    placeholder="facebook.com/username"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 items-center">
                  <span className="font-bold text-xl w-44">Instagram : </span>
                  <input
                    type="text"
                    name="instagramUrl"
                    className="w-full h-[60px] font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
                    placeholder="instagram.com/username"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Bio */}
            <div className="font-bold text-2xl px-2">About me</div>
            <textarea
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter something about you"
              className="w-full min-h-32 resize-none font-semibold text-base rounded-lg border-2 border-[#858585] p-2 bg-white focus:outline-none"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-md bg-primary hover:bg-primary/80 border-none rounded-xl text-white w-32 font-bold text-xl"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditProfile;
