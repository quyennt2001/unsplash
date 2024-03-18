import * as React from "react";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import { IPhoto } from "@/interfaces/photo";
import Empty from "../Empty";
import ImageInfinite from "../photo/ImageInfinite";

export interface IListImageProps {}

let keyIdx = 0;
async function getData() {
  const res = await fetch(
    `${BASE_URL}/photos?client_id=${CLIENT_ID[keyIdx]}&page=1`
  );
  if (res.status === 403) {
    keyIdx = (keyIdx + 1) % CLIENT_ID.length;
    return getData();
  }
  if (res.ok) {
    return (await res.json()) as IPhoto[];
  }
  if (res.status !== 200) {
    return [];
  }
}

export default async function ListImage(props: IListImageProps) {
  const data = await getData();
  if (!data) {
    return <Empty />;
  }
  return <ImageInfinite initialValue={data} />;
}
