import { Droppable } from "@hello-pangea/dnd";

function List({ children, title, id }) {
  return (
    <Droppable key={id} droppableId={String(id)}>
      {(provided) => (
        <div
          className="flex-shrink-0 p-5 w-96 rounded-2xl bg-white/10 relative"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white line-clamp-1">
              {title}
            </h2>
            {/* List actions here */}
          </div>
          <div className="divider"></div>
          <div className="overflow-y-scroll pb-3 max-h-[19rem] space-y-3">
            {children}
            {provided.placeholder}
          </div>
          <button className="btn justify-start bg-black/50 hover:bg-primary font-bold rounded-2xl absolute bottom-3 inset-x-5">
            <i className="fa-solid fa-plus"></i> Add a card
          </button>
        </div>
      )}
    </Droppable>
  );
}

export default List;
