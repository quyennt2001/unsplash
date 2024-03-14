import Avatar from "@/components/UI/Avatar";
import ButtonIcon from "@/components/UI/ButtonIcon";
import * as React from "react";
import { FaShare } from "react-icons/fa6";
import { GoKebabHorizontal } from "react-icons/go";
import { IconType } from "react-icons";
import Collection from "@/components/collection/Collection";
import ListData from "@/components/ListData";
import Link from "next/link";
import api from "@/app/api/axiosConfig";

export interface IDetailCollectionProps {}

async function getCollections(collectionId: string) {
  try {
    const res = await api(`/collections/${collectionId}`);
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getPhotos(collectionId: string) {
  try {
    const res = await api(`/collections/${collectionId}/photos`);
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getRelateds(collectionId: string) {
  try {
    const res = await api(`/collections/${collectionId}/related`);
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (e) {
    console.log(e);
  }
}

export default async function DetailCollection({
  params,
}: {
  params: { collectionId: string };
}) {
  const collection = await getCollections(params?.collectionId);
  const photos = await getPhotos(params?.collectionId);
  const relateds = await getRelateds(params?.collectionId);
  
  return (
    <div className="flex justify-center">
      <div className="w-[1280px] mb-14">
        <div className="pt-14 pb-[72px] gap-4 flex flex-col">
          <p className="text-5xl font-bold">{collection?.title}</p>
          <div className="flex justify-between max-md:flex-col max-md:gap-6">
            <div className="flex flex-col gap-6 w-1/2 max-md:w-full">
              <p className="text-lg max-md:text-[15px]">
                {collection?.description}
              </p>
              <Link
                href={`/${collection?.user?.username}`}
                className="flex gap-2 items-center"
              >
                <Avatar src={collection?.user?.profile_image?.large} />
                <p>{collection?.user?.name}</p>
              </Link>
            </div>
            <div className="flex gap-2">
              <ButtonIcon icon={FaShare as IconType} name="share" />
              <ButtonIcon icon={GoKebabHorizontal as IconType} />
            </div>
          </div>
        </div>
        <div className="flex mb-6">{collection?.total_photos} photos</div>
        <div className="flex flex-col gap-[72px]">
          <ListData data={photos} />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold mt-4 mb-6">
              You might also like
            </p>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6">
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
