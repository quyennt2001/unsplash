"use client";

import Loading from "@/components/Loading";
import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useState, useEffect, useRef } from "react";

export interface IListCollectionsProps {}

export default function ListCollections(props: IListCollectionsProps) {
  const [collections, setCollections] = useState<any>([]);
  // const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1)

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/collections?page=${page.current}`);
      const data = await res?.json();
      setCollections((prev: any) => [...prev, ...data?.data]);
      page.current ++
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <=
        50 &&
      !isLoading
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[1280px]">
        {isLoading && <Loading />}
        <div className="pt-14 pb-[72px] flex flex-col gap-4">
          <p className="text-5xl font-bold">Collections</p>
          <p className="text-lg max-md:text-[15px]">
            Explore the world through collections of beautiful photos free to
            use under the <br className="max-md:hidden" />
            <span className="underline cursor-pointer text-grey">
              Unsplash License
            </span>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {collections?.map((col: any, i: number) => (
            <Collection key={i} data={col} />
          ))}
        </div>
      </div>
    </div>
  );
}
