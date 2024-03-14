"use client";

import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useEffect, useState } from "react";
import Empty from "@/components/Empty";
import ListData from "@/components/ListData";
import api from "@/app/api/axiosConfig";

export default function ListPhotos({
  params,
}: {
  params: { photos: string[any]; username: string };
}) {
  const listname = params?.photos ? params?.photos[0] : "photos";
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await api(`/users/${params?.username}/${listname}`);
      const data = JSON.parse(JSON.stringify(res));
      setData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    document.body.style.overflow = "auto";
  }, [params]);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        {loading ? (
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <div className="bg-bg w-full aspect-[3/4]"></div>
            <div className="bg-bg w-full aspect-[3/4]"></div>
            <div className="bg-bg w-full aspect-[3/4]"></div>
          </div>
        ) : data?.length > 0 ? (
          listname === "collections" ? (
            <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {data?.map((col: any, i: number) => (
                <Collection key={i} data={col} username={params.username} />
              ))}
            </div>
          ) : (
            <ListData data={data} />
          )
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
