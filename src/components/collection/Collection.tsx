import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Tag from "../UI/Tag";

export interface ICollectionProps {
  data: any;
  username?: String;
}

export default function Collection(props: ICollectionProps) {
  const { data } = props;
  const preview_photo = data?.preview_photos;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <Link href={`/collections/${data?.id}`}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-[2px] relative group">
              <div className="absolute top-0 left-0 h-full w-full z-10 rounded-md bg-modal-white group-hover:flex hidden"></div>
              <div className="row-span-2 col-span-2">
                <div className="relative h-full">
                  <Image
                    src={preview_photo[0].urls.regular}
                    objectFit="cover"
                    fill
                    alt=""
                    className="rounded-l-md"
                  />
                </div>
              </div>
              <div className="row-span-1 col-span-1 h-max">
                <div className="relative aspect-[9/10]">
                  <Image
                    src={preview_photo[1]?.urls.small_s3 || preview_photo[0].urls.regular}
                    objectFit="cover"
                    fill
                    alt=""
                    className="rounded-se-md"
                  />
                </div>
              </div>
              <div className="row-span-1 col-span-1">
                <div className="relative aspect-[9/10]">
                  <Image
                    src={preview_photo[2]?.urls.small_s3 || preview_photo[0].urls.regular}
                    objectFit="cover"
                    fill
                    alt=""
                    className="rounded-ee-md"
                  />
                </div>
              </div>
            </div>
            <div className="truncate text-lg font-semibold">
              {data?.title}
            </div>
          </div>
        </Link>
        <div className="flex gap-2 items-center text-grey text-sm">
          <p className="">{data?.total_photos} photos</p>
          <span className="h-[1px] w-[1px] rounded-full bg-grey"></span>
          <p className="">
            Curated by {props?.username || data?.user?.username}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Tag name={data?.tags[0]?.source?.title || data?.tags[0]?.title} />
        <Tag name={data?.tags[1]?.source?.title || data?.tags[1]?.title} />
        <Tag name={data?.tags[2]?.source?.title || data?.tags[2]?.title} />
      </div>
    </div>
  );
}
