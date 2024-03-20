import * as React from "react";
import PhotoDetail from "@/components/photo/PhotoDetail";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import Empty from "@/components/Empty";

let keyIdx = 0;
async function getData(slug: string) {
  return fetch(`${BASE_URL}/photos/${slug}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as IDetailPhoto;
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        await getData(slug);
      }
      throw new Error(res.status + " " + res.statusText);
    })
    .catch((e) => console.log(e));
}

export default async function PhotoPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  if (!slug) {
    return <Empty />;
  }
  const photo = await getData(slug);

  if (!photo) {
    return <Empty />;
  }

  return <PhotoDetail photo={photo} sticky={62} />;
}
