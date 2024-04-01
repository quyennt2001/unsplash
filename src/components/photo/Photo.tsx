"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { blurHashToDataURL } from "@/ultils/blurhashDataURL";
import { tokenStore } from "@/store/userStore";
import { likePhoto, unlikePhoto } from "@/services/photoService";
import { CLIENT_ID } from "@/services";

export interface IPhotoProps {
  data: IPhoto;
}

export default function Photo(props: IPhotoProps) {
  const { data } = props;
  const { accessToken } = tokenStore();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [liked, setLiked] = useState(data?.liked_by_user);
  const router = useRouter();

  if (!data?.slug) {
    return <Empty />;
  }

  const handleClickShowModal = () => {
    setIsShow(true);
    document.body.style.overflow = "hidden";
    window.history.pushState(null, "", `/photos/${data.slug}`);
  };

  const handleClickLike = async () => {
    // console.log("click");
    if (accessToken) {
      if (data?.liked_by_user) {
        setLiked(false);
        await unlikePhoto(data?.id, accessToken);
      } else {
        setLiked(true);
        await likePhoto(data.id, accessToken);
      }
    } else {
      router.push(
        `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID[0]}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=public+write_likes+read_photos+read_collections+read_user`
      );
    }
  };

  const blurDataUrl = blurHashToDataURL(data?.blur_hash);

  return (
    <>
      {isShow && (
        <ModalPhoto slug={data.slug} setIsShow={setIsShow} isShow={isShow} />
      )}
      <div className="w-full h-auto relative cursor-zoom-in group mb-5">
        <div className="relative w-full" onClick={handleClickShowModal}>
          <Image
            src={data?.urls?.regular}
            alt=""
            height={data?.height}
            width={data?.width}
            className="w-full h-auto"
            sizes="100vw"
            placeholder={blurDataUrl ? "blur" : "empty"}
            blurDataURL={blurDataUrl}
          />
        </div>
        <div className="absolute pointer-events-none top-0 left-0 size-full hidden flex-col bg-modal justify-between group-hover:flex p-5">
          <div className="flex justify-end gap-2">
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
            <ButtonIcon
              icon={FaPlus as IconType}
              className="text-grey hover:text-black bg-white border-border border"
            />
          </div>
          <div className="flex justify-between w-full items-center">
            <Link
              href={`/${data?.user?.username}`}
              className="pointer-events-auto"
            >
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
            <ButtonIcon
              icon={FaArrowDown as IconType}
              className="text-grey hover:text-black bg-white border-border border"
            />
          </div>
        </div>
      </div>
    </>
  );
}
