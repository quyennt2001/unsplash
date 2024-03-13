import * as React from "react";
import ItemMenuCollection from "./ItemMenuCollection";
import Link from "next/link";
import SkItemMenuElement from "../skeleton/SkItemMenuCollection";
import api from "@/app/api/axiosConfig";

export interface IMenuCollectionProps {}

async function getData() {
  const res = await api(`/collections?per_page=4`);
  const data = JSON.parse(JSON.stringify(res));
  return data;
}

export default async function MenuCollection(props: IMenuCollectionProps) {
  const collections = await getData();

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
          {!collections.length ? (
            <>
              <SkItemMenuElement />
              <SkItemMenuElement />
              <SkItemMenuElement />
              <SkItemMenuElement />
            </>
          ) : (
            <>
              {collections?.map((item: any, i: number) => (
                <ItemMenuCollection data={item} key={i} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
