import Image from "next/image";
import * as React from "react";
import FormSearch from "../UI/FormSearch";
import { FiMenu } from "react-icons/fi";
import logo from '../../../public/logo.png';
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";
import Link from "next/link";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="sticky top-0 text-text bg-white text-sm z-10">
      <div className="py-[11px] px-[20px] md:h-[62px] flex items-center gap-4">
        <Link href="/">
          <button className="w-9 h-9 relative">
            <Image src={logo} alt="" fill objectFit="cover" />
          </button>
        </Link>
        <div className="flex gap-4 grow h-full">
          <FormSearch />
          <div className="flex gap-6 items-center pl-4  pr-8 border-r-2 border-r-[#d1d1d1]">
            <div className="relative group h-full flex items-center">
              <button className="text-grey hover:text-black">Explore</button>
              <Dropdown items={["backgrounds", "images", "wallpapers"]} />
            </div>
            <button className="text-grey hover:text-black">Advertise</button>
            <button>Unsplash+</button>
          </div>
          <div className="flex gap-2 items-center ">
            <Button name="Log in" selected={false} className="px-[11px]" />
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
