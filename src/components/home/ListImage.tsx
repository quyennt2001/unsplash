import * as React from "react";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import { IPhoto } from "@/interfaces/photo";
import Empty from "../Empty";
import ImageInfinite from "../photo/ImageInfinite";

export interface IListImageProps {}

let keyIdx = 0;
async function getData() {
  return fetch(`${BASE_URL}/photos?page=1`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = keyIdx + 1;
        getData();
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log('Error in list image', e));
}

export default async function ListImage(props: IListImageProps) {
  const data: IPhoto[] = await getData();
  if (!data) {
    return <Empty />;
  }
  return <ImageInfinite initialValue={data} />;
}
