import * as React from "react";
import Photo from "./Photo";

export interface IMasonryProps {
  images: Array<any>;
}

export default function Masonry(props: IMasonryProps) {
  const column: Array<any> = [...Array(3)].map(() => []);
  props?.images?.forEach((image: any, i) => {
    column[i % 3]?.push(image);
  });
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
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
