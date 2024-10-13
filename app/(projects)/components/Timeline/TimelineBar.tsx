import Image from "next/image";

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

const TimelineBar = ({ cardData }: { cardData: CardData }) => {
  return (
    <div className="flex justify-between bg-white h-20 items-center rounded-xl px-4">
      <div className="flex items-center gap-x-4">
        {/* Title */}
        <h2 className="text-black font-bold text-xl">{cardData.card_name}</h2>
      </div>
      {/* Member */}
      <div className="avatar-group -space-x-5 rtl:space-x-reverse">
        {cardData.users.slice(0, 3).map((user, index) => (
          <div className="avatar relative" key={index}>
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={48}
              height={48}
            />
            {/* <div className="w-12">
              <img src={user.avatar_url} alt={user.username} />
            </div> */}
          </div>
        ))}
        {cardData.users.length - 3 > 0 && (
          <div className="avatar placeholder">
            <div className="bg-black/65 text-xl text-white font-bold w-12">
              <span>+{cardData.users.length - 3}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineBar;
