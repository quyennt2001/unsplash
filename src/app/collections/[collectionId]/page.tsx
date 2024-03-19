import Avatar from "@/components/UI/Avatar";
import ButtonIcon from "@/components/UI/ButtonIcon";
import * as React from "react";
import { FaShare } from "react-icons/fa6";
import { GoKebabHorizontal } from "react-icons/go";
import { IconType } from "react-icons";
import Collection from "@/components/collection/Collection";
import ListData from "@/components/ListData";
import Link from "next/link";
import { ICollection } from "@/interfaces/collection";
import { IPhoto } from "@/interfaces/photo";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import Empty from "@/components/Empty";

export interface IDetailCollectionProps {}

let keyIdx = 0;
async function getCollections(collectionId: string) {
  return fetch(`${BASE_URL}/collections/${collectionId}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ICollection;
      }
      if (res.status === 403) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        getCollections(collectionId);
      }
      throw new Error(res.statusText);
    })
    .catch((e) => console.log(e));
}

async function getPhotos(collectionId: string) {
  return fetch(`${BASE_URL}/collections/${collectionId}/photos`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as IPhoto[];
      }
      if (res.status === 403) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        getPhotos(collectionId)
      }
      throw new Error(res.statusText);
    })
    .catch((e) => console.log(e));
}

async function getRelateds(collectionId: string) {
  return fetch(`${BASE_URL}/collections/${collectionId}/related`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
  .then(async (res) => {
    if (res.ok) {
      return (await res.json()) as  ICollection[];
    }
    if (res.status === 403) {
      keyIdx = (keyIdx + 1) % CLIENT_ID.length;
      getRelateds(collectionId)
    }
    throw new Error(res.statusText);
  })
  .catch((e) => console.log(e));
}

export default async function DetailCollection({
  params,
}: {
  params: { collectionId: string };
}) {
  const collection = await getCollections(params.collectionId);
  const photos = (await getPhotos(params.collectionId)) || [];
  const relateds = (await getRelateds(params.collectionId)) || [];

  if (!collection) {
    return <Empty />;
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1280px] mb-14">
        <div className="pt-14 pb-[72px] gap-4 flex flex-col">
          <p className="text-5xl font-bold">{collection.title}</p>
          <div className="flex justify-between max-md:flex-col max-md:gap-6">
            <div className="flex flex-col gap-6 w-1/2 max-md:w-full">
              <p className="text-lg max-md:text-[15px]">
                {collection.description}
              </p>
              <Link
                href={`/${collection.user.username}`}
                className="flex gap-2 items-center"
              >
                <Avatar src={collection.user.profile_image.large} />
                <p>{collection.user.name}</p>
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
              {relateds.map((item: ICollection, i: number) => (
                <Collection data={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
