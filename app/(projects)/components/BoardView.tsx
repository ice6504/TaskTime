"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

// Components
import Card from "./Card";
import ModalCard from "./Modal/ModalCard";

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
  const supabase = createClient();
  const [boardData, setBoardData] = useState<ListData[]>(data);
  const [editModal, setEditModal] = useState<boolean>(false);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const newData = [...boardData];

    if (type === "list") {
      // Rearrange lists
      const [movedList] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, movedList);

      // Update list positions in state
      newData.forEach((list, index) => {
        list.position = index;
      });

      setBoardData(newData);

      // Persist updated list order to Supabase
      try {
        for (const list of newData) {
          const { error } = await supabase
            .from("lists")
            .update({ position: list.position })
            .eq("list_id", list.list_id);

          if (error) {
            console.error("Error updating list positions:", error);
          }
        }
      } catch (error) {
        console.error("Error updating lists in Supabase:", error);
      }
    } else {
      // Handle card drag and drop
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

        // Update card positions for both lists in state
        newData[sourceListIndex].cards.forEach((card, index) => {
          card.position_card = index;
        });
        newData[destinationListIndex].cards.forEach((card, index) => {
          card.position_card = index;
        });

        setBoardData(newData);

        // Persist updated card order to Supabase
        try {
          for (const list of newData) {
            for (const card of list.cards) {
              const { error } = await supabase
                .from("cards")
                .update({
                  position_card: card.position_card,
                  list_id: list.list_id, // update list_id in case it moved
                })
                .eq("card_id", card.card_id);

              if (error) {
                console.error("Error updating card positions:", error);
              }
            }
          }
        } catch (error) {
          console.error("Error updating cards in Supabase:", error);
        }
      }
    }
  };

  useEffect(() => {
    setBoardData(data);
  }, [data]);

  const toggleModal = () => {
    setEditModal(!editModal);
  };  

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              className="flex h-full min-h-[45rem] gap-4 overflow-x-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardData
                .sort((a, b) => a.position - b.position)
                .map((list, listIndex) => (
                  <Draggable
                    key={list.list_id}
                    draggableId={String(list.list_id)}
                    index={listIndex}
                  >
                    {(provided) => (
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
                                  Add a card{" "}
                                  <i className="fa-solid fa-plus"></i>
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
                        <Droppable
                          droppableId={String(list.list_id)}
                          type="card"
                        >
                          {(provided) => (
                            <div
                              className="pb-3 h-3/4 space-y-3"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {list.cards
                                ?.sort(
                                  (a, b) => a.position_card - b.position_card
                                )
                                .map((card, cardIndex) => (
                                  <Draggable
                                    key={card.card_id}
                                    draggableId={String(card.card_id)}
                                    index={cardIndex}
                                  >
                                    {(provided) => (
                                      <Card
                                        card_name={card.card_name}
                                        openModal={toggleModal}
                                        provided={provided}
                                      />
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <button className="btn justify-start bg-black/50 hover:bg-primary font-bold rounded-2xl absolute bottom-3 inset-x-5">
                          <i className="fa-solid fa-plus"></i> Add a card
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              <div className="flex-shrink-0 w-72">
                <button className="btn btn-block justify-between h-14 font-bold text-xl rounded-2xl bg-white/10 hover:bg-white/10">
                  Add <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {editModal && <ModalCard close={toggleModal} />}
    </>
  );
}

export default BoardView;
