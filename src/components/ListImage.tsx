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
        300 &&
      !isLoading
    ) {
      fetchData();
    }
  };

  const fetchData = async () => {
    setIsLoading(false);
    try {
      const res = await fetch(`api/photos?page=${page}`);
      const items = await res.json();
      console.log(data)
      console.log(items?.data)
      // setData((prevItems: any) => [...prevItems, ...items?.data]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [document.documentElement.scrollTop]);

  return (
    <Masonry images={data} />
  );
}
