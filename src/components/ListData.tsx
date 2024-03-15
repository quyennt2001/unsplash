import * as React from "react";
import Masonry from "./photo/Masonry";
import { IPhoto } from "@/interfaces/photo";
import Photo from "./photo/Photo";
import Empty from "./Empty";
import SkPhoto from "./skeleton/SkPhoto";

export interface IListDataProps {
  data: IPhoto[];
  isLoading: boolean;
}

export default function ListData(props: IListDataProps) {
  const { data, isLoading } = props;
  if (!data) {
    return <Empty />;
  }
  return (
    // <Masonry images={data} columnCount={3} />
    <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
      {data.map((image: IPhoto, i: number) => (
        <Photo data={image} key={i} />
      ))}
      {isLoading && (
        <>
          <div className="w-full h-[300px] bg-sketelon"></div>
          <div className="w-full h-[300px] bg-sketelon"></div>
          <div className="w-full h-[300px] bg-sketelon"></div>
        </>
      )}
    </div>
  );
}
