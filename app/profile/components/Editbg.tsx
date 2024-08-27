"use client";
import React, { useState, useEffect } from "react";

function Editbg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState("");

  // Load background from localStorage when component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setBackgroundUrl(savedImage);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        localStorage.setItem("uploadedImage", base64String); // Store in localStorage
        setSelectedFile(file);
        setShowPopup(true); // Show popup
        console.log(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      setShowPopup(true);
    }
  };

  const confirmSubmission = () => {
    setBackgroundUrl(localStorage.getItem("uploadedImage"));
    setShowPopup(false);
  };

  const cancelSubmission = () => {
    setShowPopup(false);
    setSelectedFile(null);
  };

  return (
    <div className="flex items-center justify-between px-4 gap-5 pt-8">
      <div
        className="rounded-t-lg h-80 w-full py-5"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
        }}
      >
        <h1 className="text-2xl font-extrabold px-10 pb-10 text-white ">
          <img src="" alt="" />
        </h1>
        <div className="flex justify-end p-4 mt-40">
          <form action="" onSubmit={handleSubmit} className="relative">
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
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="popup-inner">
                <div className="modal-box w-96 bg-white p-4 h-44 rounded shadow-lg relative">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-primary">
                      ✕
                    </button>
                  </form>
                  <h1 className="text-lg text-primary font-bold">
                    Save picture?
                  </h1>
                  <div className="flex justify-center mt-7">
                    <button
                      onClick={confirmSubmission}
                      className="btn btn-primary text-white m-2 w-24"
                    >
                      Yes
                    </button>
                    <button
                      onClick={cancelSubmission}
                      className="btn btn-secondary m-2 w-24"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editbg;