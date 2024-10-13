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
  users: User[];
}

interface ListData {
  list_id: number;
  list_name: string;
  position: number;
  cards: CardData[];
}

export const filterTasksByUser = (
  lists: ListData[],
  userId: string
): ListData[] => {
  return lists.map((list) => {
    const userTasks = list.cards.filter((card) =>
      card.users.some((user) => user.id === userId)
    );

    return {
      list_id: list.list_id,
      list_name: list.list_name,
      position: list.position,
      cards: userTasks,
    };
  });
};
