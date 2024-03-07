"use client";

import * as React from "react";
import { useState, useEffect } from "react";

export interface IMenuCollectionProps {}

export default function MenuCollection(props: IMenuCollectionProps) {
  const [collections, setCollections] = useState<any>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/collections?page=1&per_page=4`);
      const data = await res.json();
      console.log(data?.data);
      setCollections(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex p-5 justify-between">
        <p className="font-semibold">Collections</p>
        <button className="text-grey">See all</button>
      </div>
      <div className="px-2 pb-3">
        <div className="flex flex-col justify-between"></div>
      </div>
    </div>
  );
}
