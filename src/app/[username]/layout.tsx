import Tabs from "@/components/user/Tabs";
import UserInformation from "@/components/user/UserInformation";
import Image from "next/image";
import * as React from "react";
import logo from "../../../public/logo.png";
import Tag from "@/components/UI/Tag";
import Empty from "@/components/Empty";
import { IAggregated, IDetailUser } from "@/interfaces/detailUser";
import PageNotFound from "@/components/PageNotFound";
import { getPublicUser } from "@/services/userService";


export const formatNumber = (num: number) => {
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
  ];
  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(0) + found.suffix;
    return formatted;
  }
  return num;
};

export default async function UserLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { username: string } }>) {
  if (!params.username) return <Empty />;

  const user: IDetailUser = await getPublicUser(params.username);

  if (!user) {
    return <PageNotFound />;
  }

  return (
    <div className="">
      <UserInformation user={user} />
      <Tabs
        username={params.username}
        data={{
          photos: formatNumber(user?.total_photos || 0),
          likes: formatNumber(user?.total_likes || 0),
          collections: formatNumber(user?.total_collections || 0),
        }}
      />
      <div>{children}</div>
      <div className="w-full flex justify-center">
        <div className="w-main py-20 flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <p className="text-2xl font-semibold leading-[1.3]">
              Pawel&apos;s work appears in the following categories
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
