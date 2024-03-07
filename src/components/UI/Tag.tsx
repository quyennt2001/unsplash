import * as React from "react";

export interface ITagProps {
  name: String;
}

export default function Tag(props: ITagProps) {
  return (
    <button className="rounded text-[#555] py-1 px-2 capitalize bg-[#eee] text-sm hover:bg-[#e1e1e1] w-max">
      {props?.name}
    </button>
  );
}
