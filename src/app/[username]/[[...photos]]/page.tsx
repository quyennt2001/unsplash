"use client";

import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useState, useEffect } from "react";
import Empty from "@/components/Empty";
import ListData from "@/components/ListData";
import Loading from "@/components/Loading";

export interface IListPhotosProps {}

export default function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const [images, setImages] = useState<any>([]);
  const listname = params?.photos ? params?.photos[0] : "photos";
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/user?username=${params.username}&listname=${
          params.photos ? params.photos[0] : "photos"
        }&per_page=200`
      );
      const data = await res.json();
      setImages(data?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.photos]);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        {isLoading && (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <Loading className="flex" />
          </div>
        )}
        {images?.length > 0 ? (
          listname === "collections" ? (
            <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {images?.map((col: any, i: number) => (
                <Collection key={i} data={col} username={params.username} />
              ))}
            </div>
          ) : (
            <ListData data={images} />
          )
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
