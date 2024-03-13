import * as React from "react";
import { IconType } from "react-icons";

export interface IButtonIconProps {
  icon: IconType;
  className?: String;
  name?: String;
  ref?: any 
}

export default function ButtonIcon(props: IButtonIconProps) {
  return (
    <button ref={props?.ref} className="bg-white px-[11px] gap-1 h-8 flex items-center justify-center rounded-[4px] text-grey hover:text-black hover:border-black border border-border">
      {<props.icon className="w-[14px] h-[14px]" />}
      {props?.name && <p className="capitalize">{props?.name}</p>}
    </button>
  );
}
