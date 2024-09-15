import React from "react";

function CalendarTask() {
  const bg_week = {
    sunday: "#F95858",
    monday: "#FFC035",
    tuesday: "#FF69B4",
    wednesday: "#2CBC4C",
    thursday: "#FF8336",
    friday: "#21AFFF",
    saturday: "#8F7AF7",
  };
  return (
    <div className="flex gap-14 w-full rounded-xl p-5 bg-[#FFC035] h-28 hover:-translate-y-1 duration-300 text-black font-extrabold">
      <div className="flex-none">
        <h3 className="text-xl text-center">MON</h3>
        <p className="text-5xl text-white">23</p>
      </div>
      <div className="grow">
        <h3 className="text-xl">Meeting</h3>
        <p className="text-lg font-bold line-clamp-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque dolor
          dolores distinctio temporibus sapiente rerum a quod beatae, commodi
          aliquid labore impedit ipsum ratione. Minus illo unde quaerat dolore
          enim?
        </p>
      </div>
    </div>
  );
}

export default CalendarTask;
