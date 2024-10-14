import { FC } from "react";

interface Card {
  card_id: number;
  card_name: string;
  description: string;
  startDate: string;
  endDate: string;
  lists: {
    list_name: String;
    boards: {
      title: String;
    };
  };
}

interface Props {
  detailClose: () => void;
  loading: boolean;
  selectedEvent: Card;
}

const Detail: FC<Props> = ({ detailClose, loading, selectedEvent }) => {
  const formattedDate = (originalDate: string) => {
    const [year, month, day] = originalDate.split("-");
    return `${day}/${month}/${year}`;
  };

  console.log(selectedEvent);

  return (
    <>
      <div className="absolute top-3 right-3">
        <button
          onClick={detailClose}
          className="btn btn-circle btn-ghost text-white hover:rotate-90 transition-all duration-300 hover:bg-primary/50"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
      </div>
      <div className="space-y-3 p-5 min-h-96">
        {loading ? (
          <div className="w-1/2 h-14 bg-white/20 skeleton"></div>
        ) : (
          <h2 className="text-5xl text-white font-extrabold capitalize">
            {selectedEvent.card_name}
          </h2>
        )}
        <div className="flex justify-between items-start">
          <div className="flex items-end gap-3 w-1/2">
            <h3 className="text-xl font-bold">Board :</h3>
            {loading ? (
              <div className="w-40 h-6 bg-white/20 skeleton"></div>
            ) : (
              <p className="text-white text-2xl font-bold">
                {selectedEvent.lists.boards.title}
              </p>
            )}
          </div>
          <div className="flex items-end gap-3 w-1/2">
            <h3 className="text-xl font-bold">Date :</h3>
            {loading ? (
              <div className="w-40 h-6 bg-white/20 skeleton"></div>
            ) : (
              <p className="text-white text-2xl font-bold">
                {selectedEvent.startDate == selectedEvent.endDate
                  ? formattedDate(selectedEvent.endDate)
                  : `${formattedDate(
                      selectedEvent.startDate
                    )} - ${formattedDate(selectedEvent.endDate)}`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold">Status : </h3>
          {loading ? (
            <div className="bg-white/20 w-48 h-12 skeleton"></div>
          ) : (
            <div className="btn btn-sm bg-white text-black font-extrabold hover:bg-white ">
              {selectedEvent.lists.list_name}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold">Description :</h3>
        <div
          className={`w-full min-h-44 h-fit bg-white/20 shadow-xl rounded-xl p-5 ${
            loading && "skeleton"
          }`}
        >
          {!loading && (
            <p className="text-xl text-white font-semibold">
              {selectedEvent.description}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
