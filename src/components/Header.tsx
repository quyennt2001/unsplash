import Image from "next/image";
import * as React from "react";
import FormSearch from "./FormSearch";
import { FiMenu } from "react-icons/fi";
import logo from '../../public/logo.png'
import Button from "./Button";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="md:sticky md:top-0 text-text bg-white text-sm">
      <div className="py-[11px] px-[20px] md:h-[62px] flex items-center gap-4">
        <button className="w-9 h-9 relative">
          <Image
            src={logo}
            alt=""
            fill
            objectFit="cover"
          />
        </button>
        <div className="flex gap-4 grow h-full">
          <FormSearch />
          <div className="flex gap-6 items-center pl-4  pr-8 border-r-2 border-r-[#d1d1d1]">
            <div className="relative group h-full flex items-center">
              <button className="text-grey hover:text-black">Explore</button>
              <div className="group-hover:block hidden absolute z-[1] top-10 shadow-popup rounded-[4px] min-w-[135px] origin-top-left py-2 bg-white border border-border">
                <div className="absolute h-3 w-3 left-3 top-[-6px] z-[2] border-t border-l border-border rotate-45 bg-white"></div>
                <button className="h-10 w-full capitalize px-4 py-2 hover:bg-gray-100 text-grey z-[3]">backgrounds</button>
                <button className="h-10 w-full capitalize px-4 py-2 hover:bg-gray-100 text-grey">backgrounds</button>
                <button className="h-10 w-full capitalize px-4 py-2 hover:bg-gray-100 text-grey">backgrounds</button>
              </div>
            </div>
            <button className="text-grey hover:text-black">Advertise</button>
            <button>Unsplash+</button>
          </div>
          <div className="flex gap-2 items-center ">
            <Button name='Log in' selected={false} className="px-[11px]" />
            <button className="h-8 leading-[30px] text-grey border border-border px-[11px] rounded-[4px] hover:border-black">
              Submit a photo
            </button>
          </div>
        </div>
        <button className="h-full w-8 px-[2px]">
          <FiMenu className="h-6 w-6 text-grey hover:text-black" />
        </button>
      </div>
    </div>
  );
}
