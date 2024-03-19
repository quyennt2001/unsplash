import { BASE_URL, CLIENT_ID } from "@/app/api/apiConfig";
import TabSearch from "@/components/search/TabSearch";
import {
  IResultSearchCollection,
  IResultSearchPhoto,
  IResultSearchUser,
} from "@/interfaces/search";
import * as React from "react";

export interface ISearchLayoutProps {}

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

export default async function SearchLayout({
  params,
  children,
}: {
  params: {
    category: string[];
  };
  children: React.ReactNode;
}) {
  const photos: IResultSearchPhoto[] = await search(
    "photos",
    params.category[1]
  );
  const users: IResultSearchUser[] = await search("users", params.category[1]);
  const collections: IResultSearchCollection[] = await search(
    "collections",
    params.category[1]
  );
  return (
    <div>
      <TabSearch category={params.category} />
      <div>{children}</div>
    </div>
  );
}
