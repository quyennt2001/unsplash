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
      .then(async (res) => {
        if (res.ok) {
          return (await res.json()) as ICollection[];
        }
        if (res.status === 403 && keyIdx < CLIENT_ID.length) {
          keyIdx = (keyIdx + 1) % CLIENT_ID.length;
          await fetchData();
        }
        throw new Error(res.status + " " + res.statusText);
      })
      .then((data) => {
        setCollections((prev) => [...prev, ...data]);
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
    <div className="relative">
      {!collections.length ? (
        <SkCollection />
      ) : (
        <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {collections.map((col: ICollection, i: number) => (
            <Collection key={i} data={col} />
          ))}
          {isLoading && (
            <div className="w-ful h-[600px]">
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
