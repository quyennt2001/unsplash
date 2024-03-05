"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Photo from "./Photo";
// import Masonry from "react-responsive-masonry";
import Masonry from "./Masonry";

export interface IListImageProps {}

export default function ListImage(props: IListImageProps) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(12);
  useEffect(() => {
    fetch(`api/photos?per_page=${page}`)
      .then((res) => res.json())
      .then((data: any) => {
        setData(data?.data);
        // console.log(data?.data);
      });
  }, [page]);

  return (
    // <Masonry columnsCount={3} gutter="20px">
    //   {data?.map((item, i) => (
    //     <Photo data={item} key={i} />
    //   ))}
    // </Masonry>
    // <div className="grid grid-cols-3 gap-5">
    //   {data?.map((item, i) => (
    //     <Photo data={item} key={i} />
    //   ))}
    // </div>
    <Masonry images={data} />
  );
}
