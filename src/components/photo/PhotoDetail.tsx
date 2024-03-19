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
      <div className=" flex justify-center py-[10px]">
        <React.Suspense fallback={<p>loading</p>}>
          <div className="relative max-h-[600px] max-md:w-full max-md:h-auto flex justify-center">
            <Image
              src={photo?.urls?.regular}
              height={0}
              width={0}
              alt=""
              className="w-auto h-full max-md:w-full max-md:h-auto"
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </React.Suspense>
      </div>
      <PhotoDetailInfor data={photo} />
    </div>
  );
}
