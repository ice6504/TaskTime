"use client";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

// Components
import Card from "./Card";

interface CardData {
  card_id: number;
  card_name: string;
  position_card: number;
  description: string;
  startDate: string;
  endDate: string;
}

interface ListData {
  list_id: number;
  list_name: string;
  position: number;
  cards: CardData[];
}

function BoardView({ data }: { data: ListData[] }) {
  const [boardData, setBoardData] = useState<ListData[]>(data);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newData = [...boardData]; 

    const sourceListIndex = newData.findIndex(
      (list) => list.list_id === Number(source.droppableId)
    );
    const destinationListIndex = newData.findIndex(
      (list) => list.list_id === Number(destination.droppableId)
    );

    if (sourceListIndex !== -1 && destinationListIndex !== -1) {
      const [movedCard] = newData[sourceListIndex].cards.splice(
        source.index,
        1
      );
      newData[destinationListIndex].cards.splice(
        destination.index,
        0,
        movedCard
      );
      setBoardData(newData); 
    }
  };

  useEffect(() => {
    setBoardData(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between h-[38rem] gap-4 overflow-x-auto">
        {boardData.map((list) => (
          <Droppable key={list.list_id} droppableId={String(list.list_id)}>
            {(provided) => (
              <div
                className="flex-shrink-0 p-5 w-96 rounded-2xl bg-white/10 relative"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white line-clamp-1">
                    {list.list_name}
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
                <div className="overflow-y-scroll pb-3 h-3/4 space-y-3">
                  {list.cards?.map((card, cardIndex) => (
                    <Draggable
                      key={card.card_id}
                      draggableId={String(card.card_id)}
                      index={cardIndex}
                    >
                      {(provided) => (
                        <Card
                          card_name={card.card_name}
                          description={card.description}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <button className="btn justify-start bg-black/50 hover:bg-primary font-bold rounded-2xl absolute bottom-3 inset-x-5">
                  <i className="fa-solid fa-plus"></i> Add a card
                </button>
              </div>
            )}
          </Droppable>
        ))}
        <div className="flex-shrink-0 w-72">
          <button className="btn btn-block justify-between h-14 font-bold text-xl rounded-2xl bg-white/10 hover:bg-white/10">
            Add <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default BoardView;
