import * as React from "react";
import Image from "next/image";
import { RiAttachment2 } from "react-icons/ri";
import Navbar from "@/components/home/Navbar";
import MenuCollection from "@/components/home/MenuCollection";
import ListImage from "@/components/home/ListImage";
import { blurHashToDataURL } from "@/ultils/blurhashDataURL";
import { getARandomPhoto } from "@/services/photoService";
import { IPhoto } from "@/interfaces/photo";

export interface IHomeProps {}

export default async function Home(props: IHomeProps) {
  const blurDataUrl = blurHashToDataURL("LXFr@jE1D%aeBDxat7WV00xux]t7");
  const photo: IPhoto = await getARandomPhoto();
  return (
    <div className="no-scrollbar">
      <Navbar />
      <div className="flex justify-center relative">
        <div className="flex flex-col w-main">
          <div className="flex items-end py-14 gap-6 w-full">
            <div className="flex flex-col gap-4 grow">
              <div className="flex gap-2 flex-wrap items-end w-full justify-between">
                <div className="flex grow flex-col gap-2">
                  <p className="capitalize text-[40px] font-bold">unsplash</p>
                  <div className="flex flex-col text-lg">
                    <p className="">The internet&apos;s source for visuals.</p>
                    <p>Powered by creators everywhere.</p>
                  </div>
                </div>
                <button className="h-8 bg-e rounded-lg flex items-center flex-wrap gap-2 text-mini px-3 hover:bg-e7">
                  Supported by
                  <div className="flex items-center gap-2 font-bold uppercase">
                    <RiAttachment2 />
                    <p className="">squarespace</p>
                  </div>
                </button>
              </div>
              {/* <div className="h-[54px]">
                <FormSearch className="rounded-lg" />
              </div> */}
            </div>
            <div className="size-[280px] bg-white border border-gray-200 rounded-lg max-md:hidden">
              <MenuCollection />
            </div>
            <div className="size-[280px] rounded-lg relative flex items-end max-xl:hidden">
              <div className="flex h-full w-full absolute top-0 left-0 z-[2]">
                <Image
                  src={`${photo?.urls?.raw}&w=280`}
                  height={0}
                  width={0}
                  sizes="100vw"
                  alt=""
                  className="rounded-lg w-full h-auto"
                  placeholder="blur"
                  blurDataURL={blurHashToDataURL(photo?.blur_hash)}
                />
              </div>
              <div className="p-5 flex flex-col gap-2 text-white font-semibold relative z-[3]">
                <p className="text-mini">Discover Unsplash+</p>
                <p className="text-lg">
                  Unlimited downloads.
                  <br />
                  Full legal protections.
                  <br />
                  No ads.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full min-h-[1000px]">
            <ListImage />
          </div>
        </div>
      </div>
    </div>
  );
}
