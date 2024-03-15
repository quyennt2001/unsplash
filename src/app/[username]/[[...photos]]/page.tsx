import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useEffect, useState } from "react";
import Empty from "@/components/Empty";
import ListData from "@/components/ListData";
import api from "@/app/api/axiosConfig";
import SkCollection from "@/components/skeleton/SkCollection";
import UserPhoto from "../../../components/user/UserPhoto";
import { BASE_URL, CLIENT_ID } from "@/app/api/axiosConfig";
import { ICollection } from "@/interfaces/collection";
import { IPhoto } from "@/interfaces/photo";
import SkPhoto from "@/components/skeleton/SkPhoto";

let keyIdx = 0;
async function getData(listname: string, username: string) {
  const res = await fetch(
    `${BASE_URL}/users/${username}/${listname}?client_id=${CLIENT_ID[keyIdx]}`
  );
  if (res.ok) {
    return res.json();
  }
  if (res.status === 403) {
    keyIdx = (keyIdx + 1) % CLIENT_ID.length;
    return getData(listname, username);
  }
  return [];
}

export default async function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const listname = params?.photos ? params.photos[0] : "photos";
  const data: ICollection[] | IPhoto[] = await getData(listname, params.username);

  if(!data.length) {
    return <Empty />
  }

  return <UserPhoto data={data} listname={listname} />;
}
