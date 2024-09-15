import React from "react";

function Highlight() {
  return (
    <div className="w-full flex flex-col min-h-40">
      <div className="flex items-center p-5 bg-black/70 text-white h-20 rounded-t-xl">
        <div className="flex items-center gap-5 grow">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          <p className="font-medium text-xl">Usersadfsadfsadfasdfasdfsadf</p>
        </div>
        <button className="cursor-pointer hover:text-red-600 duration-150">
          <i className="fa-solid fa-trash-can fa-lg"></i>
        </button>
      </div>
      <div className="grow bg-white text-black font-bold rounded-b-xl p-5">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis doloribus debitis rerum iure dignissimos cupiditate animi unde omnis fuga? Vitae pariatur eos quibusdam soluta enim! Officia animi accusantium excepturi doloribus?</p>
      </div>
    </div>
  );
}

export default Highlight;
