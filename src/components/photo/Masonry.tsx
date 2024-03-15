'use client'

import * as React from "react";
import { useState, useEffect } from "react";
import Photo from "./Photo";
import { IPhoto } from "@/interfaces/photo";

export interface IMasonryProps {
  images: IPhoto[];
  columnCount: number
}

export default function Masonry(props: IMasonryProps) {
  const [numColumns, setNumColumns] = useState(props.columnCount)
  const column: Array<any> = [...Array(numColumns)].map(() => []);
  props.images.forEach((image: any, i) => {
    column[i % numColumns]?.push(image);
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let column = props.columnCount
      if(width <= 1024) {
        column = 2
      } 
      setNumColumns(column)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 w-full">
      {column?.map((images, i) => {
        return (
          <div className="flex flex-col gap-5" key={i}>
            {images?.map((image: any, i: number) => (
              <Photo data={image} key={i} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
