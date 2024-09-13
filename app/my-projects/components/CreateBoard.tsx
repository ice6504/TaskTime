import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { createBoard } from "./action";

interface Props {
  closeModal: () => void;
}

const CreateBoard: FC<Props> = ({ closeModal }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [projectName, setProjectName] = useState<string>("Untitled Board");
  const [visibility, setVisibility] = useState<string>("true");
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl);
      }
    };
  }, [imageObjectUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file); // Keep the file
      const imageUrl = URL.createObjectURL(file); // Generate preview
      setImageObjectUrl(imageUrl);
      setSelectedColor("");
    }
  };
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedImage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", projectName);
    formData.append("color", selectedColor);
    formData.append("is_public", visibility);
    formData.append("image", selectedImage || "");

    try {
      await createBoard(formData);
      closeModal();
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[50rem] h-[48rem] bg-white">
        <button
          onClick={closeModal}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>

        <form onSubmit={handleSubmit}>
          <div className="w-full flex justify-between px-12 mt-12 gap-4">
            <div className="grow relative">
              {selectedColor ? (
                <div
                  className={`w-full h-full rounded-xl cursor-not-allowed`}
                  style={{ backgroundColor: selectedColor }}
                ></div>
              ) : (
                <label
                  className={`input rounded-xl flex flex-col justify-center items-center w-full h-full text-white text-md text-center hover:cursor-pointer bg-black/30`}
                >
                  {imageObjectUrl    ? (
                    <Image
                      className="rounded-xl"
                      src={imageObjectUrl}
                      alt="Preview"
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
                    onChange={handleImageChange}
                    required
                  />
                </label>
              )}
            </div>

            <div>
              <div className="grid grid-cols-4 gap-3 content-start">
                {[
                  { color: "#EED05F" },
                  { color: "#96DCA6" },
                  { color: "#67C5DF" },
                  { color: "#5395C3" },
                  { color: "#F3995B" },
                  { color: "#BB9AEB" },
                  { color: "#7E5FF2" },
                  { color: "#03468F" },
                  { color: "#FFB889" },
                  { color: "#FFC8C8" },
                  { color: "#F88080" },
                  { color: "#EA4B52" },
                ].map((item, index) => (
                  <label
                    key={index}
                    className={`cursor-pointer rounded-xl size-20 ${
                      selectedImage ? "cursor-not-allowed opacity-50" : ""
                    } ${
                      selectedColor === item.color
                        ? "border-4 border-black/75"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={item.color}
                      className="hidden"
                      onChange={() => handleColorChange(item.color)}
                      disabled={!!selectedImage}
                      required
                    />
                    <div
                      className="rounded-lg size-20"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full px-12 py-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl flex items-center font-bold text-black/80">
                Project Name
              </p>
            </div>
            {/* Project Name */}
            <label className="input rounded-xl flex items-center px-3 gap-4 bg-black/20 text-black/80 text-xl font-medium">
              <input
                type="text"
                name="title"
                className="grow"
                placeholder="Project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </label>
            {/* Visibility */}
            <p className="text-xl flex items-center font-bold text-black/80 mt-6">
              Visibility
            </p>
            <div className="flex items-center justify-between mt-2">
              <select
                name="is_public"
                className="select select-bordered w-64 max-w-xs bg-black/20 text-black/80 font-bold text-xl"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option
                  selected
                  className="font-bold bg-black/20 text-black/80 text-2xl py-10"
                  value="true"
                >
                  Public
                </option>
                <option
                  value="false"
                  className="font-bold bg-black/20 text-black/80 text-2xl py-10"
                >
                  Private
                </option>
              </select>
              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-md bg-primary hover:bg-primary/80 border-none rounded-2xl text-white w-40 font-bold text-xl"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateBoard;
