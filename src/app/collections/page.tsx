import * as React from "react";
import { ICollection } from "@/interfaces/collection";
import { BASE_URL, CLIENT_ID } from "../api/apiConfig";
import Empty from "@/components/Empty";
import CollectionInfinte from "@/components/collection/CollectionInfinite";

export interface IListCollectionsProps {}

let keyIdx = 0;
async function getData() {
  return fetch(`${BASE_URL}/collections?page=1`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ICollection[];
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        await getData();
      }
      throw new Error(res.status + " " + res.statusText);
    })
    .catch((e) => console.log(e));
}

export default async function ListCollections(props: IListCollectionsProps) {
  const data = await getData();
  return (
    <>
      {!data ? (
        <Empty />
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col w-[1280px]">
            <div className="pt-14 pb-[72px] flex flex-col gap-4">
              <p className="text-5xl font-bold">Collections</p>
              <p className="text-lg max-md:text-[15px]">
                Explore the world through collections of beautiful photos free
                to use under the <br className="max-md:hidden" />
                <span className="underline cursor-pointer text-grey">
                  Unsplash License
                </span>
              </p>
            </div>
            <CollectionInfinte initialValue={data} />
          </div>
        </div>
      )}
    </>
  );
}
