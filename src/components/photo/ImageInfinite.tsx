"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import ListData from "../ListData";
import Loading from "../Loading";
import { IPhoto } from "@/interfaces/photo";
import Empty from "../Empty";
import SkPhoto from "../skeleton/SkPhoto";

export interface IListImageProps {}

export default function ImageInfinite(props: IListImageProps) {
  const [data, setData] = useState<IPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);;
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <=
        200 &&
      !isLoading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`/api/photos?page=${page}`);
    if (res.ok) {
      const data: IPhoto[] = await res.json();
      setData((prev) => [...prev, ...data]);
    } else {
      setData([]);
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data.length) {
    return <SkPhoto />;
  }

  return (
    <div className="relative">
      <ListData isLoading={isLoading} data={data} />
      {isLoading && (
        <div className="w-full">
          <Loading />
        </div>
      )}
    </div>
  );
}
