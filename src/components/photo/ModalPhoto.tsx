"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PhotoDetail from "./PhotoDetail";
import { IDetailPhoto } from "@/interfaces/detailPhoto";
import Empty from "../Empty";
import SkPhotoDetail from "../skeleton/SkPhotoDetail";

export interface IHomeProps {
  slug: string;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

export default function ModalPhoto(props: IHomeProps) {
  const { slug, setIsShow, isShow } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<IDetailPhoto>();

  const fetchData = async () => {
    const res = await fetch(`/api/photos/${slug}`);
    if (res.ok) {
      const data = await res.json();
      setData(data);
    } else {
      setData(undefined);
    }
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
        {data ? <PhotoDetail photo={data} slug={slug} sticky={0} /> : <SkPhotoDetail />}
      </div>
    </div>
  );
}
