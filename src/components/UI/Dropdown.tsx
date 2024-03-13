import * as React from "react";

export interface IDropdownProps {
  className?: String;
  items: any[];
  right?: Boolean
}

export default function Dropdown(props: IDropdownProps) {
  return (
    <div className={"absolute z-[1] top-10 shadow-popup rounded-[4px] min-w-[135px] origin-top-left py-2 bg-white border border-border " + (props?.right ? 'right-0 flex flex-col' : 'left-0 group-hover:block hidden')}>
      <div className={"absolute h-3 w-3 top-[-7px] z-[2] border-t border-l border-border rotate-45 bg-white " + (props?.right ? 'right-3' : 'left-3')}></div>
      {props?.items?.map((item: any, i: number) => (
        <button key={i} className="h-10 w-full capitalize px-4 py-2 hover:bg-gray-100 text-grey text-start z-[3]">
          {item}
        </button>
      ))}
    </div>
  );
}
