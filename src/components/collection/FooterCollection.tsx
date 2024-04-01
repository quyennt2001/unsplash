import * as React from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/logo.png";

export interface IFooterCollectionProps {}

export default function FooterCollection(props: IFooterCollectionProps) {
  return (
    <div className="flex justify-center pt-24">
      <div className="w-main">
        <div className="flex flex-col gap-8 text-nor">
          <p className="capitalize text-[28px] font-bold">unsplash</p>
          <div className="flex justify-between items-start max-md:flex-col gap-6">
            <div className="flex gap-20 max-md:flex-col max-md:gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-grey cursor-pointer hover:text-black">
                  About
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Blog
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Community
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Join the team
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-grey cursor-pointer hover:text-black">
                  Developers/API
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Press
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Help Center
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-grey cursor-pointer hover:text-black">
                  Unsplash Awards
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Unsplash for Education
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Unsplash for iOS
                </p>
                <p className="text-grey cursor-pointer hover:text-black">
                  Apps & Plugins
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-grey">
              <button className="hover:text-black p-2">
                <RiTwitterXLine className="size-6" />
              </button>
              <button className="hover:text-black p-2">
                <FaFacebook className="size-6" />
              </button>
              <button className="hover:text-black p-2">
                <FaInstagram className="size-6" />
              </button>
            </div>
          </div>
          <div className="flex justify-between py-6 border-t">
            <div className="flex gap-2 items-center max-md:hidden">
              <Image src={logo} width={24} height={24} alt="" />
              <p className="text-grey">Make somethong awesome</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-grey cursor-pointer capitalize hover:text-black">
                privacy policy
              </p>
              <p className="text-grey cursor-pointer capitalize hover:text-black">
                terms
              </p>
              <p className="text-grey cursor-pointer capitalize hover:text-black">
                security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
