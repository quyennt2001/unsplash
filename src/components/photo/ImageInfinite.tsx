"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Masonry from "./Masonry";
import ListData from "../ListData";
import Loading from "../Loading";
import api from "@/app/api/axiosConfig";

export interface IListImageProps {}

export default function ImageInfinite(props: IListImageProps) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  // const [page, setPage] = useState(1)

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
      const res = await api.get(`/photos?page=${page.current}`);
      const data = JSON.parse(JSON.stringify(res));
      if (!data.data) {
        setData((prevItems: any) => [...prevItems, ...data]);
      }
      // console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      page.current++;
      setIsLoading(false);
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
