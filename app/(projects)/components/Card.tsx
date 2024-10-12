import { useState, useEffect, useRef } from "react";
import { DraggableProvided } from "@hello-pangea/dnd";

interface CardProps {
  card_name: string;
  provided: DraggableProvided;
  openModal: () => void;
}

function Card({ card_name, openModal, provided }: CardProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <div
      className="relative"
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <div className="absolute top-3 right-3" ref={dropdownRef}>
        <details className="dropdown dropdown-end">
          <summary className="btn btn-ghost btn-circle text-black">
            <i className="fa-solid fa-ellipsis fa-xl"></i>
          </summary>
          <ul className="dropdown-content menu bg-black/50 backdrop-blur-sm rounded-box z-10 text-white font-bold text-lg w-60 p-2 shadow">
            <li>
              <a className="justify-between">
                Rename
                <i className="fa-solid fa-pen"></i>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Open Card
                <i className="fa-solid fa-folder"></i>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Move to
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </li>
            <li>
              <a className="justify-between hover:bg-error/80">
                Delete Card
                <i className="fa-solid fa-trash-can"></i>
              </a>
            </li>
          </ul>
        </details>
      </div>
      <div
        onClick={openModal}
        className="flex flex-col justify-between gap-3 bg-white p-5 rounded-xl text-black "
      >
        {/* Title */}
        <h2 className="text-xl font-bold w-11/12 line-clamp-1">{card_name}</h2>
        {/* member */}
        <div className={`avatar-group space-x-1 rtl:space-x-reverse`}>
          <div className="avatar">
            <div className="w-7">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-7">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-7">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
