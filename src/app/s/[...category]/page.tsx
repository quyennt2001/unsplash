import * as React from "react";
import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import Empty from "@/components/Empty";
import { ICollection } from "@/interfaces/collection";
import Collection from "@/components/collection/Collection";

export interface ISearchPageProps {}

let keyIdx = 0;
async function search(category: string, query: string) {
  return fetch(`${BASE_URL}/search/${category}?query=${query}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      if (res.status === 403) {
        keyIdx = (keyIdx + 1) % CLIENT_ID.length;
        search(category, query);
      }
      throw new Error(res.statusText);
    })
    .catch((e) => console.log(e));
}

export default async function SearchPage(
  // props: ISearchPageProps,
  { params }: { params: { category: string[] } }
) {
  const data = await search(params.category[0], params.category[1]);
  const category = params.category[0];
  // console.log(data);
  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        <h1 className="text-[28px] font-bold mb-10 capitalize">
          {params.category[1]}
        </h1>
        {!data?.total ? (
          <Empty />
        ) : category === "collections" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.results.map((item: ICollection, i: number) => (
              <Collection key={i} data={item} />
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
