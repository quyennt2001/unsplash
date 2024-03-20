import * as React from "react";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import Empty from "@/components/Empty";
import { ICollection } from "@/interfaces/collection";
import Collection from "@/components/collection/Collection";
import PageNotFound from "@/components/PageNotFound";
import ListData from "@/components/photo/ListData";
import ItemUser from "@/components/user/ItemUser";
import { IUser } from "@/interfaces/user";
import { IResultSearch } from "@/interfaces/search";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export const OPTIONS = ["photos", "collections", "users"];

let keyIdx = 0;
async function search(category: string, query: string) {
  return fetch(`${BASE_URL}/search/${category}?query=${query}&per_page=20`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()) as IResultSearch;
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        await search(category, query);
      }
      throw new Error(res.status + " " + res.statusText);
    })
    .catch((e) => console.log("Error search ->", e));
}

export default async function SearchPage({
  params,
}: {
  params: { category: string[] };
}) {
  if (
    params.category.length < 2 ||
    params.category.length > 2 ||
    !OPTIONS.includes(params.category[0])
  ) {
    return <PageNotFound />;
  }
  
  const [category, searchValue] = [...params.category];
  const data = await search(category, searchValue);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        <div className="my-5">
          <h1 className="text-[30px] font-bold capitalize">
            {params.category[1]}
          </h1>
          <p>About {data?.total} results</p>
        </div>
        {!data?.total ? (
          <Empty />
        ) : category === "collections" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.results.map((item: ICollection, i: number) => (
              <Collection key={i} data={item} />
            ))}
          </div>
        ) : category === "photos" ? (
          <ListData data={data?.results} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.results.map((item: IUser, i: number) => (
              <ItemUser key={i} data={item} />
            ))}
          </div>
        )}
        <div className="flex flex-col items-center justify-center my-20">
          <button>
            <Image src={logo} width={34} height={34} alt="" />
          </button>
          <p className="text-grey mt-2 ">Make something awesome</p>
        </div>
      </div>
    </div>
  );
}
