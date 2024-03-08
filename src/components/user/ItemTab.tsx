import * as React from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

export interface IItemTabProps {
  icon: IconType;
  count: string;
  name: String;
  selected: Boolean;
  to: String
}

export default function ItemTab(props: IItemTabProps) {
  return (
    <Link href={props?.to as Url}>
      <div
        className={
          "h-14 gap-2 flex items-center " +
          (props?.selected
            ? "text-black cursor-default border-b-[3px] border-black"
            : "text-grey cursor-pointer")
        }
      >
        {
          <props.icon
            className={"max-md:hidden " + (props?.selected ? "text-black" : "text-border")}
          />
        }
        <p className="capitalize text-sm">{props?.name}</p>
        <p className="text-sm max-md:hidden">{props?.count}</p>
      </div>
    </Link>
  );
}
