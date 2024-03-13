"use client";

import PhotoDetailHeader from "@/components/photo/PhotoDetailHeader";
import PhotoDetailInfor from "@/components/photo/PhotoDetailInfor";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Avatar from "../UI/Avatar";
import ButtonIcon from "../UI/ButtonIcon";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

export interface IHomeProps {
  photo: any;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

export default function ModalPhoto(props: IHomeProps) {
  const { photo, setIsShow, isShow } = props;
  const ref = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setIsShow(false);
    window.history.replaceState(null, "", "/");
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (!isShow) return;
    const handleClickOutSide = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShow(false);
        window.history.replaceState(null, "", "/");
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [isShow]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal flex justify-center z-50 px-[120px] py-[20px] overflow-y-scroll">
      <button className="absolute left-0 top-0 p-2" onClick={handleClose}>
        <IoMdClose className="h-6 w-6 text-white opacity-[0.8] hover:opacity-[1]" />
      </button>
      <div
        className="bg-white rounded-lg px-5 w-full h-max cursor-default"
        ref={ref}
      >
        <div className=" h-[62px] text-sm z-10 w-full">
          <div className="py-[13px] flex items-center gap-2 justify-between">
            <Link
              href={`/${photo?.user?.username}`}
              className="flex items-center gap-2"
            >
              <Avatar src={photo?.user?.profile_image?.large} />
              <div className="flex flex-col justify-between">
                <p className="capitalize text-[15px] font-medium">
                  {photo?.user?.name}
                </p>
                <p className="text-[12px] text-grey">{photo?.user?.username}</p>
              </div>
            </Link>
            <div className="flex gap-2">
              <ButtonIcon icon={FaHeart as IconType} />
              <ButtonIcon icon={FaPlus as IconType} />
              <div className="bg-white h-8 flex items-center justify-center rounded-[4px] text-grey hover:text-black">
                <button className="px-[11px] border border-border h-full rounded-l-[4px] hover:border-black hover:text-black">
                  Download
                </button>
                <button className="px-[11px] border border-border border-l-white h-full rounded-r-[4px] hover:border-black hover:text-black">
                  <FaAngleDown />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[10px] px-[300px] flex justify-center">
          <div className="relative">
            <Image
              src={photo?.urls?.regular}
              height={0}
              width={0}
              alt=""
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>
        <PhotoDetailInfor data={photo} />
      </div>
    </div>
  );
}
