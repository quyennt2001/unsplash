import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IItemMenuCollectionProps {
  data: any;
}

export default function ItemMenuCollection(props: IItemMenuCollectionProps) {
  const { data } = props;

  return (
    <Link href={`/collections/${data?.id}`}>
      <button className="px-3 py-2 hover:bg-[#f5f5f5] rounded-md text-start w-full">
        <div className="flex gap-2 h-[34px]">
          <div className="relative h-8 w-8 rounded-md border">
            <Image
              src={data?.user?.profile_image?.large}
              fill
              alt=""
              className="rounded-md h-8 w-8"
            />
          </div>
          <div className="flex flex-col grow max-w-[198px]">
            <p className="truncate text-sm ">{data?.title}</p>
            <p className="truncate text-[12px] text-grey">
              by {data?.user?.name}
            </p>
          </div>
        </div>
      </button>
    </Link>
  );
}
