"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import PhotoDetail from "./PhotoDetail";

export interface IHomeProps {
  slug: string;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

export default function ModalPhoto(props: IHomeProps) {
  const { slug, setIsShow, isShow } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isShow) return;
    const handleClickOutSide = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShow(false);
        window.history.back()
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [isShow]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal flex justify-center z-50 px-[120px] overflow-y-scroll">
      <div
        className="bg-white rounded-lg px-5 w-full h-max cursor-default my-5"
        ref={ref}
      >
        <PhotoDetail slug={slug} sticky={0} />
      </div>
    </div>
  );
}
