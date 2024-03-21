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
import { IPhoto } from "@/interfaces/photo";
import Empty from "../Empty";

export interface IPhotoProps {
  data: IPhoto;
}

export default function Photo(props: IPhotoProps) {
  const [isShow, setIsShow] = useState<boolean>(false);

  const { data } = props;

  if (!data?.slug) {
    return <Empty />;
  }

  const handleClickShowModal = () => {
    setIsShow(true);
    document.body.style.overflow = "hidden";
    window.history.pushState(null, "", `/photos/${data.slug}`);
  };

  return (
    <>
      {isShow && (
        <ModalPhoto slug={data.slug} setIsShow={setIsShow} isShow={isShow} />
      )}
      <div className="w-full h-auto relative cursor-zoom-in group mb-5">
        <div className="relative w-full">
          <Image
            src={data?.urls?.regular}
            alt=""
            height={0}
            width={0}
            className="w-full h-auto"
            sizes="100vw"
          />
          {/* <Link href={`/photos/${data.slug}`}> */}
          <div
            className="absolute top-0 left-0 size-full hidden flex-col bg-modal justify-between group-hover:flex p-5"
            onClick={handleClickShowModal}
          >
            <div className="flex justify-end gap-2">
              <ButtonIcon icon={FaHeart as IconType} />
              <ButtonIcon icon={FaPlus as IconType} />
            </div>
            <div className="flex justify-between w-full items-center">
              <Link href={data?.user?.username}>
                <button className="flex gap-2 items-center justify-start">
                  <Avatar src={data?.user?.profile_image?.medium} />
                  <div className="flex flex-col justify-between text-white items-start">
                    <p className="text-nor truncate font-medium max-w-[250px]">
                      {data?.user?.name}
                    </p>
                    <p className="text-mini opacity-80 truncate max-w-[250px]">
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
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
