"use client";

import api from "@/app/api/axiosConfig";
import Loading from "@/components/Loading";
import PhotoDetailHeader from "@/components/photo/PhotoDetailHeader";
import PhotoDetailInfor from "@/components/photo/PhotoDetailInfor";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";

export interface IPhotoDetailProps {
  slug: string;
  sticky: number;
}

export default function PhotoDetail(props: IPhotoDetailProps) {
  const [photo, setPhoto] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { slug, sticky } = props;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api(`/photos/${slug}`);
      const data = JSON.parse(JSON.stringify(res));
      setPhoto(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
