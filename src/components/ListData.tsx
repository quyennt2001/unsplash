import * as React from "react";
import Masonry from "./photo/Masonry";

export interface IListDataProps {
  data: any;
}

export default function ListData(props: IListDataProps) {
  const { data } = props;
  return (
    <div className="">
      <div className="flex max-lg:hidden">
        <Masonry images={data} columnCount={3} />
      </div>
      <div className="hidden max-lg:flex">
        <Masonry images={data} columnCount={2} />
      </div>
    </div>
  );
}
