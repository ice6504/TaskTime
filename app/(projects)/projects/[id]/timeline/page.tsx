"use client";
import { usePData } from "@/hooks/usePData";
import { useUser } from "@/hooks/useUser";
import { FC, useState } from "react";
import Link from "next/link";
import { calculateDaysLeft } from "@/lib/calculateDaysLeft";
import { formatDate } from "@/lib/dateUtils";
import { filterTasksByUser } from "@/lib/filterTasksByUser";

// Components
import TimelineBar from "@/app/(projects)/components/Timeline/TimelineBar";
import NoTask from "@/app/(projects)/components/Timeline/NoTask";

interface TimelinePage {
  params: Params;
}

interface Params {
  id: string;
}

interface User {
  username: string;
  avatar_url: string;
  email: string;
}

interface CardData {
  card_id: number;
  card_name: string;
  position_card: number;
  description: string;
  startDate: string;
  endDate: string;
  users: User[];
}

interface ListData {
  list_id: number;
  list_name: string;
  position: number;
  cards: CardData[];
}

const TimelinePage: FC<TimelinePage> = ({ params }) => {
  const user = useUser();
  const { data, loading } = usePData({ board_id: params.id });
  const [showUserTasks, setShowUserTasks] = useState(false);

  const totalTasks = data?.lists.reduce(
    (acc, list) => acc + (list.cards?.length || 0),
    0
  );

  const userTaskLists =
    showUserTasks && data?.lists
      ? filterTasksByUser(data.lists, user.id)
      : data?.lists || [];

  const groupCardsByEndDate = (lists: ListData[]) => {
    const upcoming: Record<string, CardData[]> = {};
    const pastDue: Record<string, CardData[]> = {};

    lists.forEach((list) => {
      list.cards.forEach((card) => {
        const endDate = card.endDate || "No End Date";
        const daysLeft = calculateDaysLeft(endDate);

        if (daysLeft < 0) {
          if (!pastDue[endDate]) pastDue[endDate] = [];
          pastDue[endDate].push(card);
        } else {
          if (!upcoming[endDate]) upcoming[endDate] = [];
          upcoming[endDate].push(card);
        }
      });
    });

    return { upcoming, pastDue };
  };

  const { upcoming, pastDue } = groupCardsByEndDate(userTaskLists);

  return loading ? (
    <div className="flex justify-center">
      <span className="loading loading-ring w-12"></span>
    </div>
  ) : (
    <>
      <div className="flex gap-3">
        <Link href={`/projects/${params.id}/board`} className="btn w-28">
          <i className="fa-regular fa-file-lines"></i> Board
        </Link>
        <Link
          href={`/projects/${params.id}/timeline`}
          className="btn btn-primary w-28"
        >
          <i className="fa-regular fa-clock"></i> Timeline
        </Link>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between mb-5">
        <div className="flex items-center p-4 w-1/2 bg-black/30 rounded-xl">
          <h2 className="font-bold text-white">{data?.title}</h2>
          <span className="ml-3 text-sm">( {totalTasks} tasks )</span>
        </div>
        <button
          onClick={() => setShowUserTasks(!showUserTasks)}
          className="btn bg-black/50 font-bold h-14"
        >
          <i
            className={`fa-solid fa-user-${showUserTasks ? "group" : "check"}`}
          ></i>
          {showUserTasks ? "All Tasks" : "My Tasks"}
        </button>
      </div>

      <div role="tablist" className="tabs tabs-bordered tabs-lg">
        {/* Upcoming Cards */}
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Almost there"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-5 space-y-3">
          {Object.keys(upcoming).length > 0 ? (
            Object.keys(upcoming).map((endDate) => {
              const daysLeft = calculateDaysLeft(endDate);

              return (
                <div key={endDate} className="space-y-3">
                  <div className="flex items-center gap-1">
                    <h2 className="text-white text-xl font-bold">
                      {formatDate(new Date(endDate))}
                    </h2>
                    <span>
                      ( {daysLeft > 0 ? `อีก ${daysLeft} วัน` : "ถึงกำหนดแล้ว"}{" "}
                      )
                    </span>
                  </div>

                  {upcoming[endDate].map((card) => (
                    <TimelineBar key={card.card_id} cardData={card} />
                  ))}
                </div>
              );
            })
          ) : (
            <>
              <NoTask title="upcoming" />
            </>
          )}
        </div>

        {/* Past Due Cards */}
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Past due"
        />
        <div role="tabpanel" className="tab-content p-5 space-y-3">
          {Object.keys(pastDue).length > 0 ? (
            Object.keys(pastDue).map((endDate) => (
              <div key={endDate} className="space-y-3">
                <div className="flex items-center gap-1">
                  <h2 className="text-white text-xl font-bold">
                    {formatDate(new Date(endDate))}
                  </h2>
                  <span>( Overdue )</span>
                </div>

                {pastDue[endDate].map((card) => (
                  <TimelineBar key={card.card_id} cardData={card} />
                ))}
              </div>
            ))
          ) : (
            <>
              <NoTask title="past due" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
