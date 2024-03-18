"use client";

import * as React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import ItemTab from "./ItemTab";
import { MdInsertPhoto } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { IconType } from "react-icons";

export interface ITabsProps {
  username: string;
  data: any;
}

export default function Tabs(props: ITabsProps) {
  const { username, data } = props;
  const pathname = usePathname();

  return (
    <div className="mb-14 border-b border-b-border sticky top-[62px] bg-white z-10">
      <div className="flex gap-8">
        <ItemTab
          icon={MdInsertPhoto as IconType}
          name="photos"
          count={data?.photos || 0}
          selected={!pathname.split("/")[2] ? true : false}
          to={`/${username}`}
        />
        <ItemTab
          icon={FaHeart as IconType}
          name="likes"
          count={data?.likes || 0}
          selected={pathname.split("/")[2] === "likes" ? true : false}
          to={`/${username}/likes`}
        />
        <ItemTab
          icon={IoMdPhotos as IconType}
          name="collections"
          count={data?.collections || 0}
          selected={pathname.split("/")[2] === "collections" ? true : false}
          to={`/${username}/collections`}
        />
      </div>
    </div>
  );
}
