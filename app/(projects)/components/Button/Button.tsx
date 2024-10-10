import React, { FC  } from "react";


interface ButtonProps {
    isVisible: boolean;
  }

const Button:FC<ButtonProps>  =  ({isVisible}) => {

  if (!isVisible) return null;
  return (
    <div className="flex gap-2 ">
        <button className="btn btn-sm rounded-md bg-primary text-white font-bold">
          Save
        </button>
        <button className="btn btn-sm rounded-md bg-[#E1E1E1] text-[#333333] font-bold">
          Cancel
        </button>
      </div>
  )
}

export default Button