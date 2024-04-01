import * as React from "react";

export interface IInputProps {
  label: string;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  until?: string;
  type?: string;
  area?: true;
  icon?: true;
}

export default function Input(props: IInputProps) {
  const { label, value } = props;
  return (
    <div className="flex flex-col gap-1.5 justify-start w-full">
      <label className="text-nor">
        {label}{" "}
        <span className="text-grey">
          {props?.until ? `(${props.until})` : ""}
        </span>
      </label>
      {props?.area ? (
        <textarea
          name="user[bio]"
          id="user_bio"
          rows={4}
          className="py-1.5 px-3 text-nor border border-black outline-none rounded w-full"
          maxLength={250}
          value={value}
          onChange={props.onChange}
        ></textarea>
      ) : props?.icon ? (
        <div className="flex">
          <div className="border border-r-0 border-black rounded-l text-nor px-2 flex items-center">
            @
          </div>
          <input
            type={props?.type ? props?.type : "text"}
            placeholder={props?.placeholder || ""}
            value={value}
            className="py-1.5 px-3 text-nor border border-black h-10 outline-none rounded-r w-full"
            onChange={props.onChange}
          />
        </div>
      ) : (
        <input
          type={props?.type ? props?.type : "text"}
          placeholder={props?.placeholder || ""}
          value={value}
          className="py-1.5 px-3 text-nor border border-black h-10 outline-none rounded w-full"
          onChange={props.onChange}
        />
      )}
    </div>
  );
}
