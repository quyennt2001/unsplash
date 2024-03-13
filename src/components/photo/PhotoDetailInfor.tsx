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

export interface IPhotoDetailInforProps {
  data: any;
}

export default function PhotoDetailInfor(props: IPhotoDetailInforProps) {
  const { data } = props;
  return (
    <div className="py-5">
      <div className="flex flex-col gap-8">
        <div className="flex gap-6 justify-between items-center h-11">
          <div className="flex gap-28 items-center">
            <div className="flex flex-col h-full justify-between">
              <p className="text-grey text-sm">Views</p>
              <p className="font-medium">{data?.views?.toLocaleString('en-US') || 0}</p>
            </div>
            <div className="flex flex-col h-full justify-between">
              <p className=" text-grey text-sm">Downloads</p>
              <p className="font-medium">{data?.downloads?.toLocaleString('en-US') || 0}</p>
            </div>
            <div className="flex flex-col h-full justify-between">
              <p className=" text-grey text-sm">Featured in</p>
              <Link href="/" className="hover:underline">
                <p className="font-medium">Editorial</p>
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <ButtonIcon icon={PiShareFatFill as IconType} name="share" />
            <ButtonIcon icon={GoKebabHorizontal as IconType} />
          </div>
        </div>
        <p className="text-sm max-w-[50%]">{data?.description}</p>
        <div className="flex flex-col gap-[6px] text-grey">
          {data?.created_at && (
            <div className="flex gap-[6px] items-center">
              <LuCalendar className="h-[14px] w-[14px]" />
              <p className="text-sm">
                Published on {data?.created_at.substring(0, 10)}
              </p>
            </div>
          )}
          {data?.exif?.name && (
            <div className="flex gap-[6px] items-center">
              <MdOutlineCameraAlt className="h-[14px] w-[14px]" />
              <p className="text-sm">{data?.exif?.name}</p>
            </div>
          )}
          <div className="flex gap-[6px] items-center">
            <AiOutlineFileProtect className="h-[14px] w-[14px]" />
            <p className="text-sm">Free to use under the Unsplash License</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data?.tags?.map((item: any, i: number) => (
            <Tag key={i} name={item?.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
