"use client";

import Loading from "@/components/Loading";
import PhotoDetailHeader from "@/components/photo/PhotoDetailHeader";
import PhotoDetailInfor from "@/components/photo/PhotoDetailInfor";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";

export default function DetailPhoto({ params }: { params: { slug: string } }) {
  const [photo, setPhoto] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/photos/${params?.slug}`);
      const data = await res.json();
      console.log(data?.data);
      setPhoto(data?.data);
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
    <div>
      {isLoading ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white">
          <Loading className="flex" />
        </div>
      ) : (
        // <div className="fixed flex top-0 left-0 right-0 bottom-0 items-center justify-center bg-modal z-20">
          <div className="bg-white">
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
        // </div>
      )}
    </div>
  );
}
