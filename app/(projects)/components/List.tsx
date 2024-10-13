"use client";
import { FC } from "react";
import { useState } from "react";
import { DraggableProvided } from "@hello-pangea/dnd";

// Components
import AddCard from "./AddCard";

interface ListProps {
  children: React.ReactNode;
  provided: DraggableProvided;
  list_id: number;
  list_name: string;
  cardLength: number;
  onCardAdd: (list_id: number, newCard: any) => void;
}

const List: FC<ListProps> = ({
  children,
  provided,
  list_name,
  list_id,
  cardLength,
  onCardAdd,
}) => {
  const [showAddCard, setShowAddCard] = useState(false);

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  return (
    <div
      className="flex-shrink-0 p-5 pb-16 w-96 h-fit rounded-lg bg-white/10 relative"
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <div
        className="flex justify-between items-center"
        {...provided.dragHandleProps}
      >
        <h2 className="text-2xl font-bold text-white line-clamp-1">
          {list_name}
        </h2>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle bnt-xs"
          >
            <i className="fa-solid fa-ellipsis fa-xl"></i>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-black/50 backdrop-blur-sm rounded-box z-[1] text-white font-bold text-lg w-60 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Add a card <i className="fa-solid fa-plus"></i>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Rename list
                <i className="fa-solid fa-pen"></i>
              </a>
            </li>
            <li>
              <a className="justify-between hover:bg-error/80">
                Delete list
                <i className="fa-solid fa-trash-can"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="divider"></div>
      {children}
      {!showAddCard && (
        <button
          onClick={toggleAddCard}
          className="btn justify-start bg-black/50 hover:bg-primary font-bold rounded-2xl absolute bottom-3 inset-x-5"
        >
          <i className="fa-solid fa-plus"></i> Add a card
        </button>
      )}
      {showAddCard && (
        <AddCard
          close={toggleAddCard}
          list_id={list_id}
          maxPosition={cardLength}
          onCardAdd={onCardAdd} // Pass onCardAdd to AddCard
        />
      )}
    </div>
  );
};

export default List;
