"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { GrSearch } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";
import { OPTIONS } from "../../app/s/[...category]/page";

export interface IFormSearchProps {
  className?: String;
}

export default function FormSearch(props: IFormSearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  const pathname = usePathname().split("/");
  const isSearch =
    pathname.length === 4 &&
    pathname[1] === "s" &&
    OPTIONS.includes(pathname[2]);
  const [value, setValue] = useState<string>("");
  const [option, setOption] = useState(isSearch ? pathname[2] : OPTIONS[0]);
  const [isShowOption, setIsShowOption] = useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/s/${option}/${value}`);
  };

  const handleClickOption = (item: string) => {
    setOption(item);
    setIsShowOption(false);
    if (isSearch) {
      router.push(`/s/${item}/${value}`);
    }
  };

  useEffect(() => {
    if (!isShowOption) return;
    const clickOutSide = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShowOption(false);
      }
    };

    window.addEventListener("mousedown", clickOutSide);
    return () => window.removeEventListener("mousedown", clickOutSide);
  }, [isShowOption]);

  useEffect(() => {
    if (isSearch) {
      setOption(pathname[2]);
      setValue(pathname[3]);
    }
  }, pathname);
  return (
    <div
      className={
        "flex items-center grow text-text relative rounded-3xl h-full border " +
        props?.className
      }
    >
      <div className="has-[:focus]:bg-white flex items-center grow relative rounded-l-3xl h-full bg-[#eee] hover:bg-[#e7e7e7] ">
        <button className="flex items-center h-full">
          <GrSearch className="w-8 h-8 pl-[14px] text-grey hover:text-black" />
        </button>
        <form
          onSubmit={onFormSubmit}
          className="flex items-center grow text-text bg-inherit h-full"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => handleOnChange(e)}
            placeholder="Search high-resolution images"
            required
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
      <div className="h-full relative w-32">
        {isShowOption && (
          <div
            ref={ref}
            className="absolute top-[45px] left-0 w-full bg-white shadow border rounded-lg flex flex-col gap-1 text-grey py-[6px]"
          >
            {OPTIONS.filter((item: string) => item !== option).map(
              (item: string, i: number) => (
                <button
                  key={i}
                  className="capitalize hover:bg-[#e7e7e7] bg-inherit px-4 py-2"
                  onClick={() => handleClickOption(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}
        <button
          onClick={() => setIsShowOption(!isShowOption)}
          className="flex items-center justify-center bg-white w-full h-full capitalize rounded-r-3xl text-grey gap-2 border-l-2 border-l-border"
        >
          {option}
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}
