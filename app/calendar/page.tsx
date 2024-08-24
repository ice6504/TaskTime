"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// components
import Calendar from "./components/Calendar";
import Detail from "./components/Detail";

interface Card {
  card_id: number;
  card_name: string;
  description: string;
  startDate: string;
  endDate: string;
  // lists: {
  //   list_name: String;
  //   boards: {
  //     title: String;
  //   };
  // };
}

export default function CalendarPage() {
  const supabase = createClient();
  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadDetail, setLoadDetail] = useState<boolean>(true);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<null | Card>(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const fetchUser = async () => {
    setLoading(true);
    const user = await getUser();
    if (user) {
      const { data: cardMember, error } = await supabase
        .from("users")
        .select(
          `
            username ,
            cards(card_id , card_name , description , startDate , endDate)
          `
        )
        .eq("id", user.id);

      if (error) {
        console.error("Error fetching :", error);
      } else {
        setData(cardMember[0].cards);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const detailClose = () => {
    setDetailOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (detailOpen) {
      const detailElement = document.getElementById("detail");
      window.scrollTo({
        top: detailElement?.offsetTop,
        behavior: "smooth",
      });
    }
  }, [detailOpen, selectedEvent]);

  useEffect(() => {
    if (!detailOpen) {
      const calendarElement = document.getElementById("calendar");
      window.scrollTo({
        top: calendarElement?.offsetTop,
        behavior: "smooth",
      });
    }
  }, [detailOpen]);

  const handleEventClick = async (arg: any) => {
    try {
      setDetailOpen(true);
      setLoadDetail(true);
      const { data: cardSelect, error } = await supabase
        .from("cards")
        .select(
          `
          card_id , card_name , description , startDate , endDate ,
          lists!inner(
            list_name , 
            boards!inner(title)
          )
        `
        )
        .eq("card_id", parseInt(arg.event._def.publicId));

      if (error) throw error;
      if (cardSelect && cardSelect.length > 0) {
        setSelectedEvent(cardSelect[0]);
        setLoadDetail(false);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-5 pt-20 pb-5 w-full z-[5]">
      <div
        id="calendar"
        className={`bg-white/10 rounded-xl w-3/4 h-[98vh] px-10 py-5 ${
          loading && "skeleton"
        }`}
      >
        {!loading && (
          <Calendar events={data} handleEventClick={handleEventClick} />
        )}
      </div>
      {/* detail */}
      {detailOpen && selectedEvent && (
        <div
          id="detail"
          className="bg-white/10 rounded-xl w-3/4 h-fit p-5 relative"
        >
          <Detail
            detailClose={detailClose}
            loading={loadDetail}
            selectedEvent={selectedEvent}
          />
        </div>
      )}
    </div>
  );
}
