import * as React from "react";
import ItemMenuCollection from "./ItemMenuCollection";
import Link from "next/link";
import { ICollection } from "@/interfaces/collection";
import Empty from "../Empty";
import { BASE_URL, CLIENT_ID } from "@/services/index";
import { getFirstPageCollection } from "@/services/collectionService";

export interface IMenuCollectionProps {}

let keyIdx = 0;


export default async function MenuCollection(props: IMenuCollectionProps) {
  const collections: ICollection[] = await getFirstPageCollection(4);
  if (!collections || !collections.length) {
    return <Empty />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex p-5 justify-between">
        <p className="font-semibold">Collections</p>
        <Link href="/collections">
          <button className="text-grey">See all</button>
        </Link>
      </div>
      <div className="px-2 pb-3 flex items-center justify-center">
        <div className="flex flex-col justify-between w-full">
          {collections.map((item: ICollection, i: number) => (
            <ItemMenuCollection data={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
