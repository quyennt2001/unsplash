"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Masonry from "./Masonry";

export interface IListImageProps {}

export default function ListImage(props: IListImageProps) {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
      const res = await fetch(`api/photos?page=${page}`);
      const items = await res.json();
      setData((prevItems: any) => [...prevItems, ...items?.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
        <div className="flex max-lg:hidden">
          <Masonry images={data} columnCount={3} />
        </div>
        <div className="hidden max-lg:flex">
          <Masonry images={data} columnCount={2} />
        </div>
    </div>
  );
}
