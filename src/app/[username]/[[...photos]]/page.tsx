import * as React from "react";
import Empty from "@/components/Empty";
import UserPhoto from "../../../components/user/UserPhoto";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import { ICollection } from "@/interfaces/collection";
import { IPhoto } from "@/interfaces/photo";

let keyIdx = 0;
async function getData(listname: string, username: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/${username}/${listname}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
      },
    });
    if (res.ok) {
      return await res.json() as ICollection[] | IPhoto[];
    }
    if (res.status === 403) {
      keyIdx = (keyIdx + 1) % CLIENT_ID.length;
      return getData(listname, username);
    }
    throw new Error(res.statusText)
  } catch (e) {
    console.log(e);
  }
}

export default async function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const listname = params?.photos ? params.photos[0] : "photos";
  const data= await getData(listname, params.username);

  if (!data || !data.length) {
    return <Empty />;
  }

  return <UserPhoto data={data} listname={listname} />;
}
