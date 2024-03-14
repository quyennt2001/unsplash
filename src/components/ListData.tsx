import * as React from "react";
import Masonry from "./photo/Masonry";

export interface IListDataProps {
  data: any;
}

export default function ListData(props: IListDataProps) {
  const { data } = props;
  return (
    <Masonry images={data} columnCount={3} />
  )
}
