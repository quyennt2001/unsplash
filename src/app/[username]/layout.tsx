import Tabs from "@/components/user/Tabs";
import UserInformation from "@/components/user/UserInformation";
import Image from "next/image";
import * as React from "react";
import logo from "../../../public/logo.png";
import Tag from "@/components/UI/Tag";
import { BASE_URL, CLIENT_ID } from "../api/apiConfig";
import Empty from "@/components/Empty";
import { IAggregated, IDetailUser } from "@/interfaces/detailUser";
import PageNotFound from "@/components/PageNotFound";

let keyIdx = 0;
async function getData(username: string) {
  return fetch(`${BASE_URL}/users/${username}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as IDetailUser;
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        await getData(username);
      }
      throw new Error(res.status + " " + res.statusText);
    })
    .catch((e) => {
      console.log(e);
    });
}

export default async function UserLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { username: string } }>) {
  if (!params.username) return <Empty />;

  const user = await getData(params.username);

  if (!user) {
    return <PageNotFound />;
  }

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

  return (
    <div className="">
      <UserInformation user={user} />
      <Tabs
        username={params.username}
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
        <div className="w-[1280px] py-20 flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <p className="text-2xl font-semibold leading-[1.3]">
              Pawel's work appears in the following categories
            </p>
            <div className="flex gap-2 flex-wrap">
              {user?.tags?.aggregated.map((cate: IAggregated, i: number) => (
                <Tag name={cate?.source?.title || cate?.title} key={i} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button>
              <Image src={logo} width={34} height={34} alt="" />
            </button>
            <p className="text-grey mt-2 ">Make something awesome</p>
          </div>
        </div>
      </div>
    </div>
  );
}
