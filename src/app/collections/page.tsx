import * as React from "react";
import { ICollection } from "@/interfaces/collection";
import { BASE_URL, CLIENT_ID } from "../api/apiConfig";
import Empty from "@/components/Empty";
import CollectionInfinte from "@/components/collection/CollectionInfinite";

export interface IListCollectionsProps {}

let keyIdx = 0;
async function getData() {
  try {
    const res = await fetch(`${BASE_URL}/collections?page=1`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
      },
    });
    if (res.status === 403) {
      keyIdx = (keyIdx + 1) % CLIENT_ID.length;
      return getData();
    }
    if (res.ok) {
      return (await res.json()) as ICollection[];
    }
    throw new Error(res.statusText)
  } catch (e) {
    console.log(e);
  }
}

export default async function ListCollections(props: IListCollectionsProps) {
  const data = await getData();
  if (!data) {
    return <Empty />;
  }
  return <CollectionInfinte initialValue={data} />;
}
