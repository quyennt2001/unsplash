"use client";

import Loading from "@/components/Loading";
import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../api/axiosConfig";

export interface IListCollectionsProps {}

export default function ListCollections(props: IListCollectionsProps) {
  const [collections, setCollections] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api(`/collections?page=${page}`);
      const data = JSON.parse(JSON.stringify(res));
      // console.log(data);
      setCollections((prev: any) => [...prev, ...data]);
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
        300 &&
      !isLoading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[1280px]">
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
          {/* {isLoading && <Loading />} */}
        </div>
        {isLoading && (
          <div className="w-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
