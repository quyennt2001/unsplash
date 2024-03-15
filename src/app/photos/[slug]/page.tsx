import * as React from "react";
import PhotoDetail from "@/components/photo/PhotoDetail";
import { BASE_URL, CLIENT_ID } from "@/app/api/axiosConfig";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import Empty from "@/components/Empty";

let keyIdx = 0
async function getData(slug: string) {
  const res = await fetch(`${BASE_URL}/photos/${slug}?client_id=${CLIENT_ID[keyIdx]}`);
  if (res.ok) {
    return res.json();
  } 
  if(res.status === 403) {
    keyIdx = (keyIdx + 1) % CLIENT_ID.length
    return getData(slug)
  }
  return "";
}

export default async function PhotoPage({
  params,
}: {
  params: { slug: string };
}) {
  const {slug} = params 
  if(!slug) {
    return <Empty />
  }
  const photo: IDetailPhoto = await getData(slug);

  if(!photo) {
    return <Empty />
  }

  return <PhotoDetail photo={photo} slug={params.slug} sticky={62} />;
}
