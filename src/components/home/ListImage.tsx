import * as React from "react";
import { IPhoto } from "@/interfaces/photo";
import Empty from "../Empty";
import ImageInfinite from "../photo/ImageInfinite";
import { getFirstPagePhoto } from "@/services/photoService";

export interface IListImageProps {}

export default async function ListImage(props: IListImageProps) {
  const data: IPhoto[] = await getFirstPagePhoto();
  if (!data) {
    return <Empty />;
  }
  return <ImageInfinite initialValue={data} />;
}
