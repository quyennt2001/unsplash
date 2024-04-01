"use client";

import Image from "next/image";
import * as React from "react";
import FormSearch from "../UI/FormSearch";
import { FiMenu } from "react-icons/fi";
import logo from "../../../public/logo.png";
import Button from "../UI/Button";
import Link from "next/link";
import { userStore } from "@/store/userStore";
import ButtonAvt from "../UI/ButtonAvt";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="md:sticky md:top-0 text-text bg-white text-sm z-10">
      <div className="py-2.75 px-5 h-[62px] flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <button className="size-9 relative">
            <Image src={logo} alt="" style={{ objectFit: "cover" }} />
          </button>
        </Link>
        <div className="flex items-center gap-4 grow h-full">
          <FormSearch />
          <div className="flex gap-6 items-center pl-4  pr-8 border-r-2 border-r-border max-lg:hidden">
            <div className="relative group h-full flex items-center">
              <button className="text-grey hover:text-black">Explore</button>
            </div>
            <button className="text-grey hover:text-black">Advertise</button>
            <button>Unsplash+</button>
          </div>
          <div className="flex gap-3 items-center max-sm:hidden">
            <button className="h-8 leading-[30px] text-grey border border-border px-2.75 rounded hover:border-black">
              Submit a photo
            </button>
            <ButtonAvt />
          </div>
        </div>
        <button className="h-full w-8 px-0.5">
          <FiMenu className="size-6 text-grey hover:text-black" />
        </button>
      </div>
    </div>
  );
}
