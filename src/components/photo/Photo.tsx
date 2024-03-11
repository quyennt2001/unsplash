"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import ButtonIcon from "../UI/ButtonIcon";
import { IconType } from "react-icons";
import Avatar from "../UI/Avatar";
import ModalPhoto from "./ModalPhoto";

export interface IPhotoProps {
  data: any;
}

export default function Photo(props: IPhotoProps) {
  const [isShow, setIsShow] = useState(false);
  const { data } = props;

  return (
    // <Link href={{pathname: `/photos/${data?.slug}`}}>
    <>
      {isShow && (
        <ModalPhoto photo={data} setIsShow={setIsShow} isShow={isShow} />
      )}
      <div
        className="w-full h-auto relative cursor-zoom-in group"
        onClick={() => {
          setIsShow(true);
          document.body.style.overflow = "hidden";
          window.history.replaceState(
            // {
            //   ...window.history.state,
            //   as: `/photos/${data?.slug}`,
            //   url: `/photos/${data?.slug}`,
            // },
            null,
            "",
            `/photos/${data?.slug}`
          );
        }}
      >
        <div className="relative w-full">
          <Image
            src={data?.urls?.regular}
            alt=""
            height={0}
            width={0}
            className="w-full h-auto"
            sizes="100vw"
          />
          <div className="absolute top-0 left-0 w-full h-full hidden flex-col bg-modal justify-between group-hover:flex p-5">
            <div className="flex justify-end gap-2">
              <ButtonIcon icon={FaHeart as IconType} />
              <ButtonIcon icon={FaPlus as IconType} />
            </div>
            <div className="flex justify-between w-full items-center">
              <Link href={data?.user?.username}>
                <button className="flex gap-2 items-center justify-start">
                  <Avatar src={data?.user?.profile_image?.medium} />
                  <div className="flex flex-col justify-between text-white items-start">
                    <p className="text-[15px] truncate font-medium max-w-[250px]">
                      {data?.user?.name}
                    </p>
                    <p className="text-[12px] opacity-80 truncate max-w-[250px]">
                      {data?.user?.for_hire
                        ? "Available for hire"
                        : "Made to change"}
                    </p>
                  </div>
                </button>
              </Link>
              <ButtonIcon icon={FaArrowDown as IconType} />
            </div>
          </div>
        </div>
      </div>
    </>
    // </Link>
  );
}
