import Image from "next/image";
import * as React from "react";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoArrowDownOutline } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";

export interface IPhotoProps {
  data: any;
}

export default function Photo(props: IPhotoProps) {
  const { data } = props;
  return (
    <div className="w-full h-auto relative cursor-zoom-in group">
      <div className="relative w-full">
        <Image
          src={data?.urls?.regular}
          alt=""
          height={0}
          width={0}
          className="w-full h-auto"
          sizes="100vw"
        />
        <div className="absolute top-0 left-0 w-full h-full hidden flex-col justify-between group-hover:flex p-5">
          <div className="flex justify-end gap-2">
            <button className="bg-white w-10 h-8 flex items-center justify-center rounded-sm text-grey hover:text-black">
              <FaHeart className=" w-[14px] h-[14px]" />
            </button>
            <button className="bg-white w-10 h-8 flex items-center justify-center rounded-sm text-grey hover:text-black">
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-between w-full items-center">
            <div className="flex grow gap-2 items-center">
              <div className="h-8 w-8 rounded-full relative">
                <Image
                  src={data?.user?.profile_image?.medium}
                  fill
                  alt=""
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col justify-between text-white grow">
                <p className="text-[15px] truncate font-medium max-w-[250px]">
                  {data?.user?.name}
                </p>
                <p className="text-[12px] opacity-80 truncate max-w-[250px]">
                  {data?.user?.for_hire
                    ? "Available for hire"
                    : "Made to change"}
                </p>
              </div>
            </div>
            <button className="bg-white w-10 h-8 flex items-center justify-center rounded-sm text-grey hover:text-black">
              <FaArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
