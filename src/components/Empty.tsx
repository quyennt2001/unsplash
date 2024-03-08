import Image from "next/image";
import * as React from "react";
import empty from "../../public/empty.avif";
import Loading from "./Loading";

export interface IEmptyProps {}

export default function Empty(props: IEmptyProps) {
  return (
    <div className="h-[225px] flex items-center justify-center mb-24">
      <div className="h-full w-[300px] relative">
        <Image src={empty} alt="" fill />
      </div>
    </div>
  );
}
