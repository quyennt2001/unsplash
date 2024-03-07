"use client";

import * as React from "react";
import { useEffect } from "react";
import FormSearch from "@/components/UI/FormSearch";
import ListImage from "@/components/photo/ListImage";
import Navbar from "@/components/home/Navbar";
import Image from "next/image";
import { RiAttachment2 } from "react-icons/ri";
import MenuCollection from "@/components/home/MenuCollection";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  useEffect(() => {
    // console.log(window.innerHeight + window.scrollY - document.body.offsetHeight)
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center relative z-0">
        <div className="flex flex-col w-[1280px]">
          <div className="flex items-end py-14 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-end w-[672px] justify-between">
                <div className="flex grow flex-col gap-2">
                  <p className="capitalize text-[40px] font-bold">unsplash</p>
                  <div className="flex flex-col text-lg">
                    <p className="">The internet's source for visuals.</p>
                    <p>Powered by creators everywhere.</p>
                  </div>
                </div>
                <button className="h-8 bg-[#eee] rounded-lg flex items-center flex-wrap gap-2 text-[12px] px-3">
                  Supported by
                  <div className="flex items-center gap-2 font-bold uppercase">
                    <RiAttachment2 />
                    <p className="">squarespace</p>
                  </div>
                </button>
              </div>
              <div className="h-[54px]">
                <FormSearch className="rounded-lg" />
              </div>
            </div>
            <div className="w-[280px] h-[280px] bg-white border border-gray-200 rounded-lg">
              <MenuCollection />
            </div>
            <div className="w-[280px] h-[280px] rounded-lg relative flex items-end">
              <div className="flex absolute top-0 left-0 z-[2]">
                <Image
                  src="https://unsplash-assets.imgix.net/unsplashplus/asset-plus-018.jpg?dpr=1&h=280&w=280&auto=format&fit=crop&q=60"
                  width={280}
                  height={280}
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 text-white font-semibold relative z-[3]">
                <p className="text-[12px]">Discover Unsplash+</p>
                <p className="text-lg">
                  Unlimited downloads.
                  <br />
                  Full legal protections.
                  <br />
                  No ads.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full min-h-[1000px]">
            <ListImage />
          </div>
        </div>
      </div>
    </div>
  );
}
