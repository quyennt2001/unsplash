"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import ListData from "../ListData";
import Loading from "../Loading";
import { IPhoto } from "@/interfaces/photo";
import SkPhoto from "../skeleton/SkPhoto";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";

export interface IListImageProps {
  initialValue: IPhoto[];
}

export default function ImageInfinite(props: IListImageProps) {
  const [data, setData] = useState<IPhoto[]>(props.initialValue);
  const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(2);
  const page = useRef(2);

  const handleScroll = () => {
    const isScroll =
      document.documentElement.offsetHeight -
        (window.innerHeight + window.scrollY) <=
      200;
    if (isScroll && !isLoading) {
      fetchData();
      page.current++;
    }
  };

  let keyIdx = 0
  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/photos?page=${page.current}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`
      }
    });
    if (res.ok) {
      const data: IPhoto[] = await res.json();
      setData((prev) => [...prev, ...data]);
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

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
