"use client";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import ModalCard from "./Modal/ModalCard";

const cardsData = [
  {
    id: 0,
    title: "Component Libraries",
    components: [
      {
        id: 100,
        name: "material ui",
      },
      {
        id: 200,
        name: "bootstrap",
      },
    ],
  },
  {
    id: 1,
    title: "Javascript Libraries",
    components: [
      {
        id: 300,
        name: "react",
      },
      {
        id: 400,
        name: "node",
      },
    ],
  },
  {
    id: 2,
    title: "React Helper Libraries",
    components: [
      {
        id: 500,
        name: "redux",
      },
      {
        id: 600,
        name: "recoil",
      },
      {
        id: 700,
        name: "next",
      },
    ],
  },
  {
    id: 3,
    title: "React Helper Librariescxnkcjxncxjkn",
    components: [
      {
        id: 800,
        name: "redux",
      },
      {
        id: 900,
        name: "recoil",
      },
      {
        id: 1000,
        name: "next",
      },
    ],
  },
];
function BoardView() {
  const [data, setData] = useState<[]>([]);
  const [modal , setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };

  useEffect(() => {
    setData(cardsData);
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between h-full gap-4 overflow-x-auto">
        {data.map((val, index) => {
          return (
            <Droppable key={index} droppableId={`droppable${index}`}>
              {(provided) => (
                <div
                  className="flex-shrink-0 p-5 w-96 rounded-2xl bg-white/10 relative"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="flex justify-between items-center">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white line-clamp-1">
                      {val.title}
                    </h2>
                    {/* Edit List */}
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
                  <div className="overflow-y-scroll pb-3 max-h-[19rem] space-y-3">
                    {val.components?.map((component, index) => (
                      <Draggable
                        key={component.id}
                        draggableId={component.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            onClick={toggleModal}
                            className="bg-gray-200 text-black mx-1 px-4 py-3 hover:cursor-pointer"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {component.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  {modal && <ModalCard close={toggleModal} />}
                  <button className="btn justify-start bg-black/50 hover:bg-primary font-bold rounded-2xl absolute bottom-3 inset-x-5">
                    <i className="fa-solid fa-plus"></i> Add a card
                  </button>
                </div>
              )}
            </Droppable>
          );
        })}
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
