import * as React from "react";
import { IconType } from "react-icons";

export interface IButtonIconProps {
  icon: IconType;
  className?: String;
  name?: String;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonIcon(props: IButtonIconProps) {
  return (
    <button
      className={`px-2.75 gap-1 h-8 min-w-10 flex items-center justify-center rounded pointer-events-auto ${
        props?.className
          ? props.className
          : "text-grey hover:text-black bg-white border-border border hover:border-black"
      }`}
    >
      {<props.icon className="size-3.5" />}
      {props?.name && <p className="capitalize">{props?.name}</p>}
    </button>
  );
}
