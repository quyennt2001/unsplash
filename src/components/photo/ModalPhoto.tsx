"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PhotoDetail from "./PhotoDetail";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import SkPhotoDetail from "../skeleton/SkPhotoDetail";
import { BASE_URL, CLIENT_ID } from "@/services/index";

export interface IHomeProps {
  slug: string;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

let keyIdx = 0;

export default function ModalPhoto(props: IHomeProps) {
  const { slug, setIsShow, isShow } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<IDetailPhoto>();

  const fetchData = async () => {
    fetch(`${BASE_URL}/photos/${slug}`, {
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
      .then((data: IDetailPhoto) => setData(data))
      .catch((e) => {
        console.log("Error in modal photo", e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isShow) return;
    const handleClickOutSide = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShow(false);
        window.history.back();
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [isShow]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal flex justify-center z-50 px-[120px] max-xl:px-[70px] max-md:px-0 overflow-y-scroll">
      <div
        className="bg-white rounded-lg px-5 w-full h-max cursor-default my-5"
        ref={ref}
      >
        {data ? <PhotoDetail photo={data} sticky={0} /> : <SkPhotoDetail />}
      </div>
    </div>
  );
}
