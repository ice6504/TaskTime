import { FC, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import EditCard from "./EditCard";

interface ModalCardProps {
  close: () => void;
  cardId: number;
}

interface User {
  id: string;
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
  lists: {
    list_name: string;
  };
  users: User[];
}

const ModalCard: FC<ModalCardProps> = ({ close, cardId }) => {
  const supabase = createClient();
  const [cardData, setCardData] = useState<CardData | null>(null);

  const fetchCardData = async () => {
    const { data, error } = await supabase
      .from("cards")
      .select(
        ` 
        card_id, card_name, position_card, description, startDate, endDate,
        lists!cards_list_id_fkey(list_name),
        users!cardmember(id, username, avatar_url, email)
        `
      )
      .eq("card_id", cardId)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching card data: ", error);
    } else {
      setCardData(data);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [cardId]);

  console.log(cardData);

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-[50rem] min-h-[35rem] py-8 bg-[#FCFCF7]">
        <button
          onClick={close}
          className="btn btn-md btn-circle btn-ghost text-black hover:text-white hover:bg-primary/50 hover:rotate-90 transition-all duration-200 absolute right-5 top-5"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <div className="px-4  text-black">
          <h2 className="text-2xl font-extrabold">{cardData?.card_name}</h2>
          <p className="text-gray-400  font-bold">
            In list {cardData?.lists.list_name}
          </p>

          <div className="flex items-center gap-x-3 pb-5 pt-2 text-xl font-extrabold">
            <h3>Member</h3>
            {cardData?.users.map((user) => {
              return (
                <div className="avatar">
                  <div className="w-8 rounded-full ">
                    <img src={user.avatar_url} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            {cardData && <EditCard cardData={cardData} />}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalCard;
