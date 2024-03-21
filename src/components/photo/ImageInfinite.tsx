"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import ListData from "../photo/ListData";
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

  const page = useRef(2);

  const handleScroll = async () => {
    const isScroll =
      document.documentElement.offsetHeight -
        (window.innerHeight + window.scrollY) <=
      200;
    if (!isScroll || isLoading) {
      return;
    }
    fetchData();
    page.current++;
  };

  let keyIdx = 0;
  const fetchData = async () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/photos?page=${page.current}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 403 && keyIdx < CLIENT_ID.length) {
          keyIdx = keyIdx + 1;
          fetchData();
          return;
        }
        throw new Error(`${res.status} ${res.statusText}`);
      })
      .then((data: IPhoto[]) => {
        setData((prev) => [...prev, ...data]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!data.length ? (
        <SkPhoto />
      ) : (
        <div className="relative">
          <ListData data={data} />
          {isLoading && (
            <div className="w-full h-[500px]">
              <Loading />
            </div>
          )}
        </div>
      )}
    </>
  );
}
