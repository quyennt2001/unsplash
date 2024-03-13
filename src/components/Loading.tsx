import * as React from "react";

export interface ILoadingProps {
  className?: string;
}

export default function Loading(props: ILoadingProps) {
  return (
    <div
      className={
        props?.className
          ? props?.className
          : "relative top-10 left-0 right-0 flex items-center justify-center w-full"
      }
    >
      <svg
        className="animate-spin h-5 w-5 rounded-full border-t-white border-2 border-gray-400 z-[5]"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
}
