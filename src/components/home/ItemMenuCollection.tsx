import { ICollection } from "@/interfaces/collection";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { blurHashToDataURL } from "@/ultils/blurhashDataURL";

export interface IItemMenuCollectionProps {
  data: ICollection;
}

export default function ItemMenuCollection(props: IItemMenuCollectionProps) {
  const { data } = props;
  const blurDataUrl = blurHashToDataURL("LXFr@jE1D%aeBDxat7WV00xux]t7");
  return (
    <Link href={`/collections/${data.id}`}>
      <button className="px-3 py-2 hover:bg-bg rounded-md text-start w-full">
        <div className="flex gap-2 h-[34px]">
          <div className="relative size-8 rounded-md border">
            <Image
              src={data.preview_photos[0]?.urls?.regular}
              height={0}
              width={0}
              sizes="100vw"
              alt=""
              className="rounded-md size-8"
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          </div>
          <div className="flex flex-col grow max-w-[198px]">
            <p className="truncate text-sm ">{data.title}</p>
            <p className="truncate text-mini text-grey">by {data.user.name}</p>
          </div>
        </div>
      </button>
    </Link>
  );
}
