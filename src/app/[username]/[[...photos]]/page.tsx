import * as React from "react";
import Empty from "@/components/Empty";
import UserPhoto from "../../../components/user/UserPhoto";
import { ICollection } from "@/interfaces/collection";
import { IPhoto } from "@/interfaces/photo";
import { cookies } from "next/headers";
import { getListOfUser } from "@/services/userService";

export default async function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')?.value || ''
  const listname = params?.photos ? params.photos[0] : "photos";
  const data: ICollection[] | IPhoto[] = await getListOfUser(
    listname,
    params.username,
    accessToken
  );

  if (!data || !data.length) {
    return <Empty />;
  }

  return <UserPhoto data={data} listname={listname} />;
}
