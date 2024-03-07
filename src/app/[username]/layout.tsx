"use client";

import Tabs from "@/components/Tabs";
import { useState, useEffect } from "react";
import UserInformation from "@/components/UserInformation";
import Image from "next/image";
import * as React from "react";
import logo from "../../../public/logo.png";

export default function UserLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { username: string } }>) {
  const [user, setUser] = useState<any>({});

  const formatNumber = (num: number, precision = 1) => {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted =
        (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }

    return num;
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/user?username=${params?.username}`);
      const data = await res.json();
      // console.log(data?.data);
      setUser(data?.data);
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
      <Tabs
        username={params?.username}
        data={{
          photos:
            user?.total_photos < 1000
              ? user?.total_photos
              : formatNumber(user?.total_photos),
          likes:
            user?.total_likes < 1000
              ? user?.total_likes
              : formatNumber(user?.total_likes),
          collections:
            user?.total_collections < 1000
              ? user?.total_collections
              : formatNumber(user?.total_collections),
        }}
      />
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
