import React from "react";

function Member() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl">Alex</h2>
          <p className="text-xs">Workspace Admin</p>
        </div>
      </div>
      <select className="select select-primary bg-transparent text-xl font-bold">
        <option disabled selected>
          Admin
        </option>
        <option>Member</option>
      </select>
    </div>
  );
}

export default Member;
