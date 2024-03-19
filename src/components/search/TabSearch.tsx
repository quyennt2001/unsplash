"use client";

import * as React from "react";
import ItemTab from "@/components/user/ItemTab";
import { useSearchParams, usePathname } from "next/navigation";
import { MdInsertPhoto } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { IconType } from "react-icons";
import { FaUserGroup } from "react-icons/fa6";

export interface ITabSearchProps {
  category: string[];
}

export default function TabSearch(props: ITabSearchProps) {
  const pathname = usePathname();

  return (
    <div className="mb-14 border-b border-b-border sticky top-[62px] bg-white z-10">
      <div className="flex gap-8">
        <ItemTab
          icon={MdInsertPhoto as IconType}
          name="photos"
          count={"0"}
          selected={pathname.split("/")[2] === "photos" ? true : false}
          to={`/s/photos/${props.category[1]}`}
        />
        <ItemTab
          icon={IoMdPhotos as IconType}
          name="collections"
          count={"0"}
          selected={pathname.split("/")[2] === "collections" ? true : false}
          to={`/s/collections/${props.category[1]}`}
        />
        <ItemTab
          icon={FaUserGroup as IconType}
          name="users"
          count={"0"}
          selected={pathname.split("/")[2] === "users" ? true : false}
          to={`/s/users/${props.category[1]}`}
        />
      </div>
    </div>
  );
}
