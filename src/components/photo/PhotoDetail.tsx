import PhotoDetailHeader from "@/components/photo/PhotoDetailHeader";
import PhotoDetailInfor from "@/components/photo/PhotoDetailInfor";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import Image from "next/image";
import * as React from "react";
import { blurHashToDataURL } from "@/ultils/blurhashDataURL";

export interface IPhotoDetailProps {
  sticky: number;
  photo: IDetailPhoto;
}

export default function PhotoDetail(props: IPhotoDetailProps) {
  const { photo, sticky } = props;
  const blurDataUrl = blurHashToDataURL(photo?.blur_hash)

  return (
    <div className="bg-white">
      <PhotoDetailHeader user={photo?.user} photo={photo} sticky={sticky} />
      <div className=" flex justify-center py-[10px]">
        <div className="relative max-h-[550px] max-md:w-full max-md:h-auto flex justify-center">
          <Image
            src={photo?.urls?.regular}
            height={photo?.height}
            width={photo?.width}
            alt=""
            sizes="100vw"
            style={{ objectFit: "contain" }}
            placeholder={blurDataUrl ? "blur" : "empty"}
            blurDataURL={blurDataUrl}
          />
        </div>
      </div>
      <PhotoDetailInfor data={photo} />
    </div>
  );
}
