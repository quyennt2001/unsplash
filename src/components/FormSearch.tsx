import * as React from "react";
import { GrSearch } from "react-icons/gr";
import { MdOutlineControlCamera } from "react-icons/md";

export interface IFormSearchProps {
  className?: String
}

export default function FormSearch(props: IFormSearchProps) {
  return (
    <div className={"flex items-center grow text-text relative rounded-3xl h-full bg-[#eee] " + props?.className}>
      <button className="flex items-center h-full">
        <GrSearch className="w-8 h-8 pl-[14px] text-grey hover:text-black" />
      </button>
      <div className="flex items-center grow text-text bg-inherit h-full">
        <input
          type="text"
          placeholder="Search high-resolution images"
          className="bg-inherit border-none outline-none flex grow items-center w-full h-[37px] pl-[10px] placeholder:text-grey"
        />
      </div>
      <div className="flex items-center justify-center bg-inherit w-12 h-10 rounded-r-3xl">
        <button className="flex items-center bg-inherit border-none justify-center h-full">
          <MdOutlineControlCamera className="h-5 w-5 text-grey hover:text-black" />
        </button>
      </div>
    </div>
  );
}
