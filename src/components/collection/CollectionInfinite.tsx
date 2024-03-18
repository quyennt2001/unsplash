"use client";

import Loading from "@/components/Loading";
import Collection from "@/components/collection/Collection";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ICollection } from "@/interfaces/collection";
import SkCollection from "@/components/skeleton/SkCollection";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";

export interface ICollectionInfinte {
  initialValue: ICollection[];
}

export default function CollectionInfinte(props: ICollectionInfinte) {
  const [collections, setCollections] = useState<ICollection[]>(
    props.initialValue
  );
  const page = useRef(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + window.scrollY) <=
        400 &&
      !isLoading
    ) {
      fetchData();
      page.current++;
    }
  };

  let keyIdx = 0;
  const fetchData = async () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/collections?page=${page.current}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.statusText)
      })
      .then((data: ICollection[]) => {
        setCollections((prev) => [...prev, ...data])
      })
      .catch((e) => {
        console.log(e)
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
        {!collections.length ? (
          <SkCollection />
        ) : (
          <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {collections.map((col: ICollection, i: number) => (
              <Collection key={i} data={col} />
            ))}
          </div>
        )}
        {isLoading && (
          <div className="w-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
