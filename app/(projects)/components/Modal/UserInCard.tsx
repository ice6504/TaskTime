interface User {
  username: string;
  avatar_url: string;
}

function UserInCard({ data }: { data: User }) {
  return (
    <div className="avatar gap-2 p-2 flex items-center text-white cursor-pointer">
      <div className="w-2/12 rounded-full">
        <img src={data.avatar_url} alt={data.username} />
      </div>
      <h3 className="line-clamp-1 w-10/12">{data.username}</h3>
    </div>
  );
}

export default UserInCard;
