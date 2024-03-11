"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Masonry from "./Masonry";
import ListData from "../ListData";
import Loading from "../Loading";

export interface IListImageProps {
}

export default function ImageInfinite(props: IListImageProps) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const count = useRef(0);
  const page = useRef(1)

  const handleScroll = () => {
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <=
        200 &&
      !isLoading
    ) {
      fetchData();
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/photos?page=${page.current}`);
      const items = await res.json();
      setData((prevItems: any) => [...prevItems, ...items?.data]);
      page.current++ 
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <ListData data={data} />
      {isLoading && (
      <div className="absolute left-0 right-0 bottom-[-40px] flex items-center justify-center w-full">
        <Loading className="flex" />
      </div>
      )}
    </div>
  );
}
