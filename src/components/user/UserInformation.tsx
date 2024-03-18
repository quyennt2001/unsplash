"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoArrowDownSharp } from "react-icons/io5";
import { GoKebabHorizontal } from "react-icons/go";
import { HiMapPin } from "react-icons/hi2";
import { GrAttachment } from "react-icons/gr";
import { FaCaretDown } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Tag from "@/components/UI/Tag";
import Dropdown from "../UI/Dropdown";
import { ICustom, IDetailUser } from "@/interfaces/detailUser";

export interface IUserInformationProps {
  user: IDetailUser;
}

export default function UserInformation(props: IUserInformationProps) {
  const refConnect = useRef<HTMLInputElement>(null);
  const refMenu = useRef<HTMLInputElement>(null);
  const [isClickConnect, setIsClickConnect] = useState(false);
  const [isClickMenu, setIsClickMenu] = useState(false);
  const { user } = props;

  const handleClickConnect = (event: MouseEvent) => {
    if (
      refConnect.current &&
      !refConnect.current.contains(event.target as Node)
    ) {
      setIsClickConnect(false);
    }
  };

  const handleClickMenu = (event: MouseEvent) => {
    if (refMenu.current && !refMenu.current.contains(event.target as Node)) {
      setIsClickMenu(false);
    }
  };

  useEffect(() => {
    if (isClickConnect) {
      window.addEventListener("mousedown", handleClickConnect);
      return () => window.removeEventListener("mousedown", handleClickConnect);
    }
    if (isClickMenu) {
      window.addEventListener("mousedown", handleClickMenu);
      return () => window.removeEventListener("mousedown", handleClickMenu);
    }
  }, [isClickConnect, isClickMenu]);

  return (
    <div className="flex justify-center pt-14 pb-14 relative z-20">
      <div className="flex w-[1280px] gap-12 max-md:flex-col max-md:gap-6">
        <div className="w-[32%] max-md:w-full flex items-start justify-end max-md:justify-start">
          <div className="relative border rounded-full">
            <Image
              src={user?.profile_image?.large}
              height={150}
              width={150}
              alt=""
              className="rounded-full z-[1]"
            />
            <div className="absolute top-1 right-3 h-8 w-8 flex items-center justify-center z-[2] bg-border text-white rounded-full border-white border-[2px]">
              <IoArrowDownSharp className="h-6 w-6 rounded-full " />
            </div>
          </div>
        </div>
        <div className="w-[68%] max-md:w-full flex flex-col gap-4">
          <div>
            <button className="bg-bg rounded-[70px] py-1 px-3 max-md:hidden">
              Subscriber
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 items-center">
              <p className="capitalize text-[40px] max-md:text-[28px] font-bold ">
                {user?.first_name} {user?.last_name}
              </p>
              <div className="relative group">
                <button
                  onClick={() => setIsClickMenu(!isClickMenu)}
                  className="h-8 bg-white border border-border text-[#767676] px-[11px] rounded-[4px] hover:border-black hover:text-black"
                >
                  <GoKebabHorizontal className="h-[18px] w-[18px]" />
                </button>
                {isClickMenu && (
                  <div ref={refMenu}>
                    <Dropdown
                      items={["Follow", "Share profile", "Report"]}
                      right={true}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="w-[70%] max-lg:w-[90%] text-wrap text-[15px] leading-[1.6] max-md:w-full">{user?.bio}</p>
              <div className="flex flex-col gap-2">
                <button className="flex gap-2 text-grey hover:text-black items-center text-sm">
                  <HiMapPin className="h-4 w-4" />
                  {user?.location}
                </button>
                <div className="relative">
                  <button
                    className="flex gap-2 text-grey hover:text-black items-center text-sm"
                    onClick={() => setIsClickConnect(!isClickConnect)}
                  >
                    <GrAttachment />
                    Connect with {user?.first_name}
                    <FaCaretDown className="h-4 w-4" />
                  </button>
                  {isClickConnect && (
                    <div
                      ref={refConnect}
                      className="absolute z-[1] top-6 shadow-popup rounded-[4px] origin-top-left py-2 bg-white border border-border"
                    >
                      <button className="flex gap-6 items-center text-sm h-9 w-full px-4 py-2 hover:bg-gray-100 text-grey z-[3]">
                        <FaEarthAsia />
                        {user?.social?.portfolio_url}
                      </button>
                      <button className="flex gap-6 items-center text-sm h-9 w-full capitalize px-4 py-2 hover:bg-gray-100 text-grey">
                        <FaInstagram />
                        {user?.social?.instagram_username}
                      </button>
                      <button className="flex gap-6 items-center text-sm h-9 w-full capitalize px-4 py-2 hover:bg-gray-100 text-grey">
                        <RiTwitterXLine />
                        {user?.social?.twitter_username}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="">Interests</p>
              <div className="flex gap-2 flex-wrap">
                {user?.tags?.custom.map((tag: ICustom, i: number) => (
                  <Tag key={i} name={tag?.source?.title || tag?.title} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
