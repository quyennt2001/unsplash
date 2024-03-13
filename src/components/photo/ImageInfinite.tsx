"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import ListData from "../ListData";
import Loading from "../Loading";
import api from "@/app/api/axiosConfig";

export interface IListImageProps {}

export default function ImageInfinite(props: IListImageProps) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/photos?page=${page}`);
      const data = JSON.parse(JSON.stringify(res));
      if (!data.data) {
        setData((prevItems: any) => [...prevItems, ...data]);
      }
      // console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    // fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <ListData data={data} />
      {isLoading && (
        <div className="w-full">
          <Loading />
        </div>
      )}
    </div>
  );
}
