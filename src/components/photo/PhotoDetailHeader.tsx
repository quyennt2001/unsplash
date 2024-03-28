import Link from "next/link";
import * as React from "react";
import Avatar from "../UI/Avatar";
import ButtonIcon from "../UI/ButtonIcon";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa6";
import { IUser } from "@/interfaces/user";

export interface IPhotoDetailHeaderProps {
  data: IUser;
  sticky: number;
}

export default function PhotoDetailHeader(props: IPhotoDetailHeaderProps) {
  const { data, sticky } = props;
  if (!data) {
    return <></>;
  }
  return (
    <div
      className={
        `sticky bg-white h-[62px] text-sm z-10 ` +
        (sticky ? `top-[${sticky}px]` : "top-0")
      }
    >
      <div className="py-[13px] flex items-center gap-2 justify-between">
        <Link href={`/${data?.username}`} className="flex items-center gap-2">
          <Avatar src={data?.profile_image?.medium} />
          <div className="flex flex-col justify-between">
            <p className="capitalize text-nor font-medium">{data?.name}</p>
            <p className="text-mini text-grey">{data?.username}</p>
          </div>
        </Link>
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
  );
}
