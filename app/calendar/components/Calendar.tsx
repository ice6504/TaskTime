import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Card {
  card_id: number;
  card_name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Props {
  events: Card[];
  handleEventClick: (arg: any) => void;
}

const Calendar: FC<Props> = ({ events ,handleEventClick }) => {
  const formatEndDate = (endDate: string) => {
    const date = new Date(endDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const formattedEvents = events.map((event) => ({
    id: event.card_id.toString(),
    title: event.card_name,
    start: event.startDate,
    end: formatEndDate(event.endDate),
    allDay: true,
  }));
  
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      nowIndicator={true}
      droppable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEventRows={true}
      events={formattedEvents}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
