import * as React from "react";
import { IconType } from "react-icons";

export interface IButtonIconProps {
  icon: IconType;
  className?: String;
  name?: String;
  ref?: any;
}

export default function ButtonIcon(props: IButtonIconProps) {
  return (
    <button
      ref={props?.ref}
      className="bg-white px-2.75 gap-1 h-8 flex items-center justify-center rounded text-grey hover:text-black hover:border-black border border-border pointer-events-auto"
    >
      {<props.icon className="size-3.5" />}
      {props?.name && <p className="capitalize">{props?.name}</p>}
    </button>
  );
}
