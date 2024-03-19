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
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as IPhoto[];
      }
      if (res.status === 403) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        getData();
      }
      throw new Error(res.statusText);
    })
    .catch((e) => console.log(e));
}

export default async function ListImage(props: IListImageProps) {
  const data = await getData();
  if (!data) {
    return <Empty />;
  }
  return <ImageInfinite initialValue={data} />;
}
