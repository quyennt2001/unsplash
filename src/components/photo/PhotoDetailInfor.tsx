import * as React from "react";
import ButtonIcon from "../UI/ButtonIcon";
import { IoIosShareAlt } from "react-icons/io";
import { IconType } from "react-icons";
import { FaShare } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { AiOutlineFileProtect } from "react-icons/ai";
import Tag from "../UI/Tag";
import Link from "next/link";
import { MdOutlineCameraAlt } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { IDetailPhoto, ITag } from "@/interfaces/detailPhoto";

export interface IPhotoDetailInforProps {
  data: IDetailPhoto;
}

export default function PhotoDetailInfor(props: IPhotoDetailInforProps) {
  const { data } = props;
  return (
    <div className="py-5">
      <div className="flex flex-col gap-8">
        <div className="flex gap-6 justify-between items-center h-11">
          <div className="flex gap-28 items-center max-md:gap-14">
            <div className="flex flex-col h-full justify-between">
              <p className="text-grey text-sm">Views</p>
              <p className="font-medium">{data?.views?.toLocaleString('en-US') || 0}</p>
            </div>
            <div className="flex flex-col h-full justify-between">
              <p className=" text-grey text-sm">Downloads</p>
              <p className="font-medium">{data?.downloads?.toLocaleString('en-US') || 0}</p>
            </div>
            <div className="flex flex-col h-full justify-between max-md:hidden">
              <p className=" text-grey text-sm">Featured in</p>
              <Link href="/" className="hover:underline">
                <p className="font-medium">Editorial</p>
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <ButtonIcon icon={PiShareFatFill as IconType} name="share" className='hover:border-black' />
            <ButtonIcon icon={GoKebabHorizontal as IconType} className='hover:border-black' />
          </div>
        </div>
        <p className="text-sm max-w-[50%] max-md:max-w-full">{data?.description}</p>
        <div className="flex flex-col gap-1.5 text-grey">
          {data?.created_at && (
            <div className="flex gap-1.5 items-center">
              <LuCalendar className="size-3.5" />
              <p className="text-sm">
                Published on {data.created_at.substring(0, 10)}
              </p>
            </div>
          )}
          {data?.exif?.name && (
            <div className="flex gap-1.5 items-center">
              <MdOutlineCameraAlt className="size-3.5" />
              <p className="text-sm">{data.exif.name}</p>
            </div>
          )}
          <div className="flex gap-1.5 items-center">
            <AiOutlineFileProtect className="size-3.5" />
            <p className="text-sm">Free to use under the Unsplash License</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data?.tags?.map((item: ITag, i: number) => (
            <Tag key={i} name={item?.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
