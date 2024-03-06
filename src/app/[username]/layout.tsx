"use client";

import Tabs from "@/components/Tabs";
import { useState, useRef, useEffect } from "react";
import UserInformation from "@/components/UserInformation";
import Image from "next/image";
import * as React from "react";
import logo from "../../../public/logo.png";

export default function UserLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { username: string } }>) {
  const [user, setUser] = useState<any>({});

  const fetchData = async () => {
    try {
      const res = await fetch(`api/user?username=${params?.username}`);
      const data = await res.json();
      setUser(data?.data);
      console.log(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <UserInformation user={user} />
      <Tabs username={params?.username} />
      <div>{children}</div>
      <div className="w-full flex justify-center">
        <div className="w-[1280px] py-20 flex flex-col items-center justify-center">
          <button>
            <Image src={logo} width={34} height={34} alt="" />
          </button>
          <p className="text-grey mt-2 ">Make something awesome</p>
        </div>
      </div>
    </div>
  );
}
