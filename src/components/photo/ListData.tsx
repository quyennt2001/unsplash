import * as React from "react";
import { IPhoto } from "@/interfaces/photo";
import Photo from "./Photo";
import Empty from "../Empty";
import Masonry from "./Masonry";
// import Masonry from "react-responsive-masonry";
export interface IListDataProps {
  data: IPhoto[];
}

export default function ListData(props: IListDataProps) {
  const { data } = props;
  if (!data || !data.length) {
    return <Empty />;
  }
  
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
      {data.map((image: IPhoto, i: number) => (
        <Photo data={image} key={i} />
      ))}
    </div>
    // <Masonry images={data} columnCount={3}/>
  );
}
