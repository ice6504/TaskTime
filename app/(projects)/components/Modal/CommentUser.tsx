import React, { useState } from "react";
import Button from "../Button/Button";

function CommentUser() {
  return (
    <>
      <div className="flex items-center">
        <div className="avatar pb-7">
          <div className="w-8 rounded-full ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="ml-3">
          <h3 className="text-lg pt-4 font-bold">Ajt</h3>
          <div className="grow bg-gray-300 text-black font-bold rounded-xl p-2 ">
            <p>
              Lorem 
              
            </p>
          </div>
          <div className="pt-2 flex justify-end relative"></div>
        </div>
      </div>
    </>
  );
}

export default CommentUser;
