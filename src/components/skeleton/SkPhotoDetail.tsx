import * as React from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { GoKebabHorizontal } from "react-icons/go";
import { PiShareFatFill } from "react-icons/pi";
import Avatar from "../UI/Avatar";
import ButtonIcon from "../UI/ButtonIcon";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa6";

export interface ISkPhotoDetailProps {}

export default function SkPhotoDetail(props: ISkPhotoDetailProps) {
  return (
    <div>
      <div className="bg-white h-[62px] text-sm z-10">
        <div className="py-[13px] flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Avatar src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff&crop=faces&dpr=1&h=32&w=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
            <div className="flex flex-col justify-between">
              <p className="w-[50px] h-3 rounded-2xl bg-sketelon"></p>
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonIcon icon={FaHeart as IconType} />
            <ButtonIcon icon={FaPlus as IconType} />
            <div className="bg-white h-8 flex items-center justify-center rounded text-grey hover:text-black">
              <button className="px-2.75 border border-border h-full rounded-l hover:border-black hover:text-black">
                Download
              </button>
              <button className="px-2.75 border border-border border-l-white h-full rounded-r hover:border-black hover:text-black">
                <FaAngleDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="relative min-h-[300px] min-w-[400px] max-md:w-full bg-sketelon"></div>
      </div>
      <div className="py-5">
        <div className="flex flex-col gap-8">
          <div className="flex gap-6 justify-between items-center h-11">
            <div className="flex gap-28 items-center">
              <div className="flex flex-col h-full justify-between">
                <p className="text-grey text-sm">Views</p>
                <p className="font-medium">{0}</p>
              </div>
              <div className="flex flex-col h-full justify-between">
                <p className=" text-grey text-sm">Downloads</p>
                <p className="font-medium">{0}</p>
              </div>
              <div className="flex flex-col h-full justify-between">
                <p className=" text-grey text-sm">Featured in</p>
                <p className="font-medium">Editorial</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <ButtonIcon icon={PiShareFatFill as IconType} name="share" />
              <ButtonIcon icon={GoKebabHorizontal as IconType} />
            </div>
          </div>
          <p className="w-[50px] h-3 rounded-2xl bg-sketelon"></p>
          <p className="w-[50px] h-3 rounded-2xl bg-sketelon"></p>
          <div className="flex gap-1.5 items-center">
            <AiOutlineFileProtect className="size-3.5" />
            <p className="text-sm">Free to use under the Unsplash License</p>
          </div>
        </div>
      </div>
    </div>
  );
}
