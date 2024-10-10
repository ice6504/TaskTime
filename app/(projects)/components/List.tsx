function List({ children, title, provided }) {
  return (
    <div
      className="flex-shrink-0 p-5 w-96 h-full rounded-2xl bg-white/10 relative"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <div className="flex justify-between items-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
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
                Delete list <i className="fa-solid fa-trash-can"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="divider"></div>
      {/* Cards */}
      <div className="overflow-y-auto max-h-72">{children}</div>
      {/* Add card button */}
      <button className="btn bg-black/50 hover:bg-primary font-bold absolute bottom-3 inset-x-5">
        <i className="fa-solid fa-plus"></i> Add a card
      </button>
    </div>
  );
}

export default List;
