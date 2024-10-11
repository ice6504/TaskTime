import React, { FC  } from "react";
import EditCard from "./EditCard";

interface AddModalProps {
  close: () => void;
}

const AddModal: FC<AddModalProps> = ({ close }) => {
  return (
    <details className="dropdown">
    <summary className="btn m-1">open or close</summary>
    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </details>    
  );
};

export default AddModal;
