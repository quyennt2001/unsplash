"use client";

import PhotoDetailHeader from "@/components/PhotoDetailHeader";
import PhotoDetailInfor from "@/components/PhotoDetailInfor";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";

export default function DetailPhoto({ params }: { params: { slug: string } }) {
  const [photo, setPhoto] = useState<any>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/photos/${params?.slug}`);
      const data = await res.json();
      console.log(data?.data);
      setPhoto(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PhotoDetailHeader data={photo?.user} />
      <div className="py-[10px] px-[300px] flex justify-center">
        <div className="relative">
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
