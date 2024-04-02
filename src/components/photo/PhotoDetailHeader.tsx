"use client";

import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import Avatar from "../UI/Avatar";
import ButtonIcon from "../UI/ButtonIcon";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa6";
import { IUser } from "@/interfaces/user";
import { tokenStore } from "@/store/userStore";
import { likePhoto, unlikePhoto } from "@/services/photoService";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import { useRouter } from "next/navigation";
import { CLIENT_ID } from "@/services";

export interface IPhotoDetailHeaderProps {
  user: IUser;
  sticky: number;
  photo: IDetailPhoto;
}

export default function PhotoDetailHeader(props: IPhotoDetailHeaderProps) {
  const { user, sticky, photo } = props;
  const { accessToken } = tokenStore();
  const [liked, setLiked] = useState(photo?.liked_by_user);
  const router = useRouter();
  
  if (!user) {
    return <></>;
  }

  const handleClickLike = async () => {
    if (accessToken) {
      if (photo.liked_by_user) {
        setLiked(false);
        await unlikePhoto(photo?.id, accessToken);
      } else {
        setLiked(true);
        await likePhoto(photo?.id, accessToken);
      }
    } else {
      router.push(
        `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID[0]}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=public+write_likes+read_photos+read_collections+read_user+write_user`
      );
    }
  };

  return (
    <div
      className={
        `sticky bg-white h-[62px] text-sm z-10 ` +
        (sticky ? `top-[${sticky}px]` : "top-0")
      }
    >
      <div className="py-[13px] flex items-center gap-2 justify-between">
        <Link href={`/${user?.username}`} className="flex items-center gap-2">
          <Avatar src={user?.profile_image?.medium} />
          <div className="flex flex-col justify-between">
            <p className="capitalize text-nor font-medium">{user?.name}</p>
            <p className="text-mini text-grey">{user?.username}</p>
          </div>
        </Link>
        <div className="flex gap-2">
          <div onClick={handleClickLike}>
            <ButtonIcon
              icon={FaHeart as IconType}
              className={
                liked
                  ? "text-white bg-error hover:bg-[#e04c4c]"
                  : "text-grey hover:text-black bg-white border-border border"
              }
            />
          </div>
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
