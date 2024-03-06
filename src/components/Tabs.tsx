"use client";

import * as React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import ItemTab from "./ItemTab";
import { MdInsertPhoto } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { IconType } from "react-icons";
import path from "path";

export interface ITabsProps {
  username: any;
}

export default function Tabs(props: ITabsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const list = searchParams.get("photos");
  // console.log(pathname.split('/')[2])
  return (
    <div className="mb-14 border-b border-b-border sticky top-[62px] bg-white z-10">
      <div className="flex gap-8">
        <ItemTab
          icon={MdInsertPhoto as IconType}
          name="photos"
          count="2.1k"
          selected={!pathname.split('/')[2] ? true : false}
          to={`/${props.username}`}
        />
        <ItemTab
          icon={FaHeart as IconType}
          name="likes"
          count="39k"
          selected={pathname.split('/')[2] === "likes" ? true : false}
          to={`/${props.username}/likes`}
        />
        <ItemTab
          icon={IoMdPhotos as IconType}
          name="collections"
          count="7k"
          selected={pathname.split('/')[2] === "collections" ? true : false}
          to={`/${props.username}/collections`}
        />
      </div>
    </div>
  );
}
