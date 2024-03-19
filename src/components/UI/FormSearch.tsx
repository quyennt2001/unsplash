"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { GrSearch } from "react-icons/gr";
import { MdOutlineControlCamera } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export interface IFormSearchProps {
  className?: String;
}

export default function FormSearch(props: IFormSearchProps) {
  const [value, setValue] = useState<string>("");
  const [option, setOption] = useState("collection");
  const router = useRouter()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/s/photos/${value}`)
  }
  return (
    <div
      className={
        "flex items-center grow text-text relative rounded-3xl h-full bg-[#eee] border hover:bg-[#e7e7e7] " +
        props?.className
      }
    >
      <div className="has-[:focus]:bg-white flex items-center grow relative rounded-l-3xl h-full">
        <button className="flex items-center h-full">
          <GrSearch className="w-8 h-8 pl-[14px] text-grey hover:text-black" />
        </button>
        <form onSubmit={onFormSubmit} className="flex items-center grow text-text bg-inherit h-full">
          <input
            type="text"
            value={value}
            onChange={(e) => handleOnChange(e)}
            placeholder="Search high-resolution images"
            className="bg-inherit border-none outline-none flex grow items-center w-full h-[37px] pl-[10px] placeholder:text-grey"
          />
        </form>
        {value && (
          <div className="flex items-center justify-center bg-inherit w-12 border-[#c4c4c4]">
            <button
              className="flex items-center bg-inherit  justify-center h-max "
              onClick={() => setValue("")}
            >
              <IoCloseOutline className="h-5 w-5 text-grey hover:text-black" />
            </button>
          </div>
        )}
      </div>
      <button className="flex items-center justify-center bg-white w-28 h-full rounded-r-3xl text-grey gap-1 border-l-2 border-l-border">
        {/* <button className="flex items-center bg-inherit border-none justify-center h-full">
          <MdOutlineControlCamera className="h-5 w-5 text-grey hover:text-black" />
        </button> */}
        <p className="capitalize ">{option}</p>
        <FaAngleDown />
      </button>
    </div>
  );
}
