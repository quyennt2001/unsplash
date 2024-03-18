import PhotoDetailHeader from "@/components/photo/PhotoDetailHeader";
import PhotoDetailInfor from "@/components/photo/PhotoDetailInfor";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import Image from "next/image";
import * as React from "react";

export interface IPhotoDetailProps {
  sticky: number;
  photo: IDetailPhoto;
}

export default function PhotoDetail(props: IPhotoDetailProps) {
  const { photo, sticky } = props;

  return (
    <div className="bg-white">
      <PhotoDetailHeader data={photo?.user} sticky={sticky} />
      <div className=" flex justify-center">
        <div className="relative min-h-[300px] min-w-[400px] max-md:w-full bg-sketelon">
          <Image
            src={photo?.urls?.regular}
            height={0}
            width={0}
            alt=""
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>
      </div>
      <PhotoDetailInfor data={photo} />
    </div>
  );
}
