import * as React from "react";
import Empty from "@/components/Empty";
import UserPhoto from "../../../components/user/UserPhoto";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import { ICollection } from "@/interfaces/collection";
import { IPhoto } from "@/interfaces/photo";

let keyIdx = 0;
async function getData(listname: string, username: string) {
  return fetch(`${BASE_URL}/users/${username}/${listname}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as ICollection[] | IPhoto[];
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        await getData(listname, username);
      }
      throw new Error(res.status + " " + res.statusText);
    })
    .catch((e) => {
      console.log(e);
    });
}

export default async function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const listname = params?.photos ? params.photos[0] : "photos";
  const data = await getData(listname, params.username);

  if (!data || !data.length) {
    return <Empty />;
  }

  return <UserPhoto data={data} listname={listname} />;
}
