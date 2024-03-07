"use client";

import Avatar from "@/components/Avatar";
import ButtonIcon from "@/components/ButtonIcon";
import * as React from "react";
import { useState, useEffect } from "react";
import { FaShare } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import { IconType } from "react-icons";
import Masonry from "@/components/Masonry";
import Collection from "@/components/Collection";

export interface IDetailCollectionProps {}

export default function DetailCollection({
  params,
}: {
  params: { collectionId: string };
}) {
  const [collection, setCollection] = useState<any>({});
  const [photos, setPhotos] = useState<any>([]);
  const [relateds, setRelateds] = useState<any>([]);

  const fetchCollection = async () => {
    try {
      const res = await fetch(`/api/collections/${params?.collectionId}`);
      const data = await res.json();
      // console.log(data?.data);
      setCollection(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await fetch(
        `/api/collections/${params?.collectionId}/photos`
      );
      // console.log(res);
      const data = await res.json();
      // console.log("photos", data?.data);
      setPhotos(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await fetch(
        `/api/collections/${params?.collectionId}/related`
      );
      const data = await res.json();
      console.log(data?.data);
      setRelateds(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCollection();
    fetchPhotos();
    fetchRelated();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px] mb-14">
        <div className="pt-14 pb-[72px] gap-4 flex flex-col">
          <p className="text-5xl font-bold">{collection?.title}</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              <p className="text-lg">{collection?.description}</p>
              <div className="flex gap-2 items-center">
                <Avatar src={collection?.user?.profile_image?.large} />
                <p>{collection?.user?.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonIcon icon={FaShare as IconType} name="share" />
              <ButtonIcon icon={GoKebabHorizontal as IconType} />
            </div>
          </div>
        </div>
        <div className="flex mb-6">{collection?.total_photos} photos</div>
        <div className="flex flex-col gap-[72px]">
          <Masonry images={photos} />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold mt-4 mb-6">
              You might also like
            </p>
            <div className="grid grid-cols-3 gap-6">
              {relateds?.map((item: any, i: number) => (
                <Collection data={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
