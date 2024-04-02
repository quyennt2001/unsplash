import Avatar from "@/components/UI/Avatar";
import ButtonIcon from "@/components/UI/ButtonIcon";
import * as React from "react";
import { FaShare } from "react-icons/fa6";
import { GoKebabHorizontal } from "react-icons/go";
import { IconType } from "react-icons";
import Collection from "@/components/collection/Collection";
import ListData from "@/components/photo/ListData";
import Link from "next/link";
import { ICollection } from "@/interfaces/collection";
import { IPhoto } from "@/interfaces/photo";
import Empty from "@/components/Empty";
import {
  getCollection,
  getPhotosOfCollection,
  getRelatedCollections,
} from "@/services/collectionService";
import { cookies } from "next/headers";

export interface IDetailCollectionProps {}

export default async function DetailCollection({
  params,
}: {
  params: { collectionId: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value || "";

  const collection: ICollection = await getCollection(
    params.collectionId,
    accessToken
  );
  const photos: IPhoto[] = await getPhotosOfCollection(
    params.collectionId,
    accessToken
  );
  const relateds: ICollection[] = await getRelatedCollections(
    params.collectionId,
    accessToken
  );

  if (!collection) {
    return <Empty />;
  }

  return (
    <div className="flex justify-center">
      <div className="w-main mb-14">
        <div className="pt-14 pb-18 gap-4 flex flex-col">
          <p className="text-5xl font-bold">{collection.title}</p>
          <div className="flex justify-between max-md:flex-col max-md:gap-6">
            <div className="flex flex-col gap-6 w-1/2 max-md:w-full">
              <p className="text-lg max-md:text-nor">
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
        <div className="flex mb-6">{collection?.total_photos} images</div>
        <div className="flex flex-col gap-18">
          <ListData data={photos} />
          {relateds.length > 0 ? (
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
          ) : <></>}
        </div>
      </div>
    </div>
  );
}
