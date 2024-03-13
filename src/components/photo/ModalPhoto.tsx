"use client";

import PhotoDetailInfor from "@/components/photo/PhotoDetailInfor";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Avatar from "../UI/Avatar";
import ButtonIcon from "../UI/ButtonIcon";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import api from "@/app/api/axiosConfig";
import PhotoDetail from "./PhotoDetail";

export interface IHomeProps {
  slug: string;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow: boolean;
}

export default function ModalPhoto(props: IHomeProps) {
  const { slug, setIsShow, isShow } = props;
  const [photo, setPhoto] = useState<any>({});
  const ref = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setIsShow(false);
    window.history.replaceState(null, "", "/");
    document.body.style.overflow = "auto";
  };

  const fetchData = async () => {
    try {
      const res = await api(`/photos/${slug}`);
      const data = JSON.parse(JSON.stringify(res));
      console.log(data);
      setPhoto(data);
    } catch (e) {
      console.log("Error Modal Photo", e);
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
        window.history.replaceState(null, "", "/");
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, [isShow]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-modal flex justify-center z-50 px-[120px] overflow-y-scroll">
      {/* <button className="absolute left-0 top-0 p-2" onClick={handleClose}>
        <IoMdClose className="h-6 w-6 text-white opacity-[0.8] hover:opacity-[1]" />
      </button> */}
      <div
        className="bg-white rounded-lg px-5 w-full h-max cursor-default my-5"
        ref={ref}
      >
        <PhotoDetail slug={slug} sticky={0} />
      </div>
    </div>
  );
}
