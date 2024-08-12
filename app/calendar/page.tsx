"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// components
import Calendar from "./components/Calendar";

interface Cards {
  card_id: number;
  card_name: string;
  description: string;
  startDate: string;
  endDate: string;
  list_id: number;
  position_card: number;
}

export default function CalendarPage() {
  const supabase = createClient();
  const [data, setData] = useState<Cards[]>([]);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<null | Cards>(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const fetchUser = async () => {
    const user = await getUser();
    if (user) {
      const { data: cardmember, error } = await supabase
        .from("cards")
        .select(`*`);
      // .eq("id", user.id);

      if (error) {
        console.error("Error fetching cardmember:", error);
      } else {
        setData(cardmember);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const detailClose = () => {
    setDetailOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (detailOpen && selectedEvent) {
      const detailElement = document.getElementById("detail");
      if (detailElement) {
        window.scrollTo({
          top: detailElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [detailOpen, selectedEvent]);

  useEffect(() => {
    if (!detailOpen) {
      const calendarElement = document.getElementById("calendar");
      if (calendarElement) {
        window.scrollTo({
          top: calendarElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [detailOpen]);

  const handleEventClick = async (arg: any) => {
    try {
      const { data: cardmember, error } = await supabase
        .from("cards")
        .select(`*`)
        .eq("card_id", parseInt(arg.event._def.publicId));
      if (error) throw error;
      if (cardmember && cardmember.length > 0) {
        setSelectedEvent(cardmember[0]);
        setDetailOpen(true);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const formattedDate = (originalDate: string) => {
    const [year, month, day] = originalDate.split("-");
    return `${day}/${month}/${year}`;
  };

  console.log(selectedEvent);

  return (
    <div className="flex flex-col items-center justify-between gap-5 pt-10 pb-5 w-full z-[5]">
      <div
        id="calendar"
        className="bg-white/10 rounded-xl w-3/4 h-[98vh] px-10 py-5"
      >
        <Calendar events={data} handleEventClick={handleEventClick} />
      </div>
      {/* detail */}
      {detailOpen && selectedEvent && (
        <div
          id="detail"
          className="bg-white/10 rounded-xl w-3/4 h-fit p-5 space-y-3 relative"
        >
          <div className="absolute top-3 right-3">
            <button
              onClick={detailClose}
              className="btn btn-circle btn-ghost text-white hover:rotate-90 transition-all duration-300 hover:bg-primary/50"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
          </div>
          <h2 className="text-5xl text-white font-extrabold capitalize">
            {selectedEvent.card_name}
          </h2>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold w-1/2">
              Board : {""}
              <span className="text-white text-2xl"></span>
            </h3>
            <h3 className="text-xl font-bold w-1/2 px-2">
              Date :{" "}
              <span className="text-white text-2xl">
                {selectedEvent.startDate == selectedEvent.endDate
                  ? formattedDate(selectedEvent.endDate)
                  : `${formattedDate(
                      selectedEvent.startDate
                    )} - ${formattedDate(selectedEvent.endDate)}`}
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-5">
            <h3 className="text-xl font-bold">Status : </h3>
            <select className="select bg-white text-black w-full max-w-48 font-bold text-xl rounded-2xl">
              {/* <option selected>{selectedEvent.status}</option> */}
              <option>In Progress</option>
              <option>Review</option>
              <option>Done</option>
            </select>
          </div>
          <h3 className="text-xl font-bold">Description :</h3>
          <div className="w-full min-h-44 h-fit bg-white/15 shadow-xl rounded-xl p-5">
            <p className="text-xl text-white font-semibold">
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
