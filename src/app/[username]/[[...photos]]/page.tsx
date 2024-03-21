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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = keyIdx + 1;
        getData(listname, username);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => {
      console.log('Error user page', e);
    });
}

export default async function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const listname = params?.photos ? params.photos[0] : "photos";
  const data: ICollection[] | IPhoto[] = await getData(
    listname,
    params.username
  );

  if (!data || !data.length) {
    return <Empty />;
  }

  return <UserPhoto data={data} listname={listname} />;
}
