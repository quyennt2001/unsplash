import * as React from "react";
import Image, { StaticImageData } from "next/image";

export interface IAvatarProps {
  src: string | StaticImageData;
  className?: String
}

export default function Avatar(props: IAvatarProps) {
  return (
    <div
      className={`rounded-full relative border ` + (props?.className ? props?.className : 'h-8 w-8')}
    >
      <Image src={props?.src} fill alt="" className="rounded-full" />
    </div>
  );
}
