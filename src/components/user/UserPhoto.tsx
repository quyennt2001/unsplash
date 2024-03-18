"use client";

import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useEffect, useState } from "react";
import ListData from "@/components/ListData";
import { ICollection } from "@/interfaces/collection";

export interface IUserPhotoProps {
  data: any;
  listname: string;
}

export default function UserPhoto(
  props: IUserPhotoProps,
) {

  const {data, listname} = props

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        {listname === "collections" ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data?.map((col: ICollection, i: number) => (
            <Collection key={i} data={col}  />
          ))}
        </div>
        ) : (
        <ListData data={data} />)}
      </div>
    </div>
  );
}
