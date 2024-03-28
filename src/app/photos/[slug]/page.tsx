import * as React from "react";
import PhotoDetail from "@/components/photo/PhotoDetail";
import { cookies } from "next/headers";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import Empty from "@/components/Empty";
import { getAPhoto } from "@/services/photoService";

let keyIdx = 0;


export default async function PhotoPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  if (!slug) {
    return <Empty />;
  }
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value || ''
  const photo: IDetailPhoto = await getAPhoto(slug, accessToken);

  if (!photo) {
    return <Empty />;
  }

  return <PhotoDetail photo={photo} sticky={62} />;
}
