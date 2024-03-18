import * as React from "react";

export interface ISkCollectionProps {}

export default function SkCollection(props: ISkCollectionProps) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
      <div className="w-full aspect-[3/4] bg-sketelon rounded-md"></div>
      <div className="w-full aspect-[3/4] bg-sketelon rounded-md"></div>
      <div className="w-full aspect-[3/4] bg-sketelon rounded-md"></div>
    </div>
  );
}
