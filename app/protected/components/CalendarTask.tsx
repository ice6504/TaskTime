import React from "react";

// Define the props that the component will receive
interface CalendarTaskProps {
  date: string; // Expected format: "YYYY-MM-DD"
  title: string;
  description: string;
}

const CalendarTask: React.FC<CalendarTaskProps> = ({
  date,
  title,
  description,
}) => {
  // Define background colors for each day of the week
  const bg_week: Record<string, string> = {
    sun: "#F95858",
    mon: "#FFC035",
    tue: "#FF69B4",
    wed: "#2CBC4C",
    thu: "#FF8336",
    fri: "#21AFFF",
    sat: "#8F7AF7",
  };

  // Create a Date object from the date string
  const dateObj = new Date(date);

  // Get the day of the week (0-6) and map to a string
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const day = days[dateObj.getDay()]; // Get the day name

  // Set the background color based on the day
  const backgroundColor = bg_week[day];

  return (
    <div
      className="flex gap-14 w-full rounded-xl p-5 text-black font-extrabold h-28"
      style={{ backgroundColor }}
    >
      <div className="flex-none">
        <h3 className="text-xl text-center">{day.toUpperCase()}</h3>{" "}
        {/* Show day name */}
        <p className="text-5xl text-white">{dateObj.getDate()}</p>{" "}
        {/* Show date number */}
      </div>
      <div className="grow">
        <h3 className="text-xl">{title}</h3>
        <p className="text-lg font-bold line-clamp-1">{description}</p>
      </div>
    </div>
  );
};

export default CalendarTask;
