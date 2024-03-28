import * as React from "react";

export interface IButtonProps {
  name: String;
  span?: String;
  selected: Boolean;
  onClick?: Function;
  className?: String 
}

export default function Button(props: IButtonProps) {
  return (
    <div className={"relative " + props?.className} >
      {props?.span && (
        <span className="absolute text-[10px] text-grey top-0 left-1/2 translate-x-[-50%] capitalize">
          {props?.span}
        </span>
      )}
      <button
        className={
          "relative h-14 w-max font-medium capitalize hover:text-black " +
          (props.selected ? "text-black border-b-[3px] border-b-black" : "text-grey")
        }
      >
        {props?.name}
      </button>
    </div>
  );
}
