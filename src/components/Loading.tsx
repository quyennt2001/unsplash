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
          : "fixed bottom-5 left-0 right-0 flex items-center justify-center"
      }
    >
      <svg
        className="animate-spin h-5 w-5 rounded-full border-t-white border-2 border-gray-400 z-50"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
}
