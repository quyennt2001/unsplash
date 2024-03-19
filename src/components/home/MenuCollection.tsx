import * as React from "react";
import ItemMenuCollection from "./ItemMenuCollection";
import Link from "next/link";
import { ICollection } from "@/interfaces/collection";
import Empty from "../Empty";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";

export interface IMenuCollectionProps {}

let keyIdx = 0;
async function getData() {
  return fetch(`${BASE_URL}/collections?per_page=4`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ICollection[];
      }
      if (res.status === 403) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        getData();
      }
      throw new Error(res.statusText);
    })
    .catch((e) => console.log(e));
}

export default async function MenuCollection(props: IMenuCollectionProps) {
  const collections = await getData();
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
