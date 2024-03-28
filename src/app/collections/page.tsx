import * as React from "react";
import { ICollection } from "@/interfaces/collection";
import Empty from "@/components/Empty";
import CollectionInfinte from "@/components/collection/CollectionInfinite";
import { getFirstPageCollection } from "@/services/collectionService";

export interface IListCollectionsProps {}

export default async function ListCollections(props: IListCollectionsProps) {
  const data: ICollection[] = await getFirstPageCollection(10);
  return (
    <>
      {!data ? (
        <Empty />
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col w-main">
            <div className="pt-14 pb-18 flex flex-col gap-4">
              <p className="text-5xl font-bold">Collections</p>
              <p className="text-lg max-md:text-nor">
                Explore the world through collections of beautiful photos free
                to use under the <br className="max-md:hidden" />
                <span className="underline cursor-pointer text-grey">
                  Unsplash License
                </span>
              </p>
            </div>
            <CollectionInfinte initialValue={data} />
          </div>
        </div>
      )}
    </>
  );
}
