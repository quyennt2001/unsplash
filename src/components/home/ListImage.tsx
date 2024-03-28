import * as React from "react";
import { IPhoto } from "@/interfaces/photo";
import Empty from "../Empty";
import ImageInfinite from "../photo/ImageInfinite";
import { getFirstPagePhoto } from "@/services/photoService";
import { cookies } from "next/headers";

export interface IListImageProps {}

export default async function ListImage(props: IListImageProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value || "";
  const data: IPhoto[] = await getFirstPagePhoto(accessToken);
  if (!data) {
    return <Empty />;
  }
  return <ImageInfinite initialValue={data} />;
}
