import Link from "next/link";
import * as React from "react";
import img from "../../public/logo.png";
import Avatar from "../UI/Avatar";
import ButtonIcon from "../UI/ButtonIcon";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa6";

export interface IPhotoDetailHeaderProps {
  data: any;
  sticky: number;
}

export default function PhotoDetailHeader(props: IPhotoDetailHeaderProps) {
  const { data, sticky } = props;
  // console.log(data);
  return (
    <div
      className={
        `sticky bg-white h-[62px] text-sm z-10 ` +
        (sticky ? `top-[${sticky}px]` : "top-0")
      }
    >
      <div className="py-[13px] flex items-center gap-2 justify-between">
        <Link href={`/${data?.username}`} className="flex items-center gap-2" onClick={() => document.body.style.overflow = "auto"}>
          <Avatar src={data?.profile_image?.medium} />
          <div className="flex flex-col justify-between">
            <p className="capitalize text-[15px] font-medium">{data?.name}</p>
            <p className="text-[12px] text-grey">{data?.username}</p>
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
  );
}
