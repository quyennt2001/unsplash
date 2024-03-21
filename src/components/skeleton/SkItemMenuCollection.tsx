import * as React from 'react';
import Image from 'next/image';

export interface IAppProps {
}

export default function SkItemMenuElement (props: IAppProps) {
  return (
    <div >
      <button className="px-3 py-2 hover:bg-bg rounded-md text-start w-full">
        <div className="flex gap-2 h-[34px]">
          <div className="relative size-8 rounded-md border">
            <Image
              src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff&crop=faces&dpr=1&h=32&w=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              fill
              alt=""
              className="rounded-md size-8"
            />
          </div>
          <div className="flex flex-col grow max-w-[198px] justify-between">
            <p className="truncate text-sm w-[50px] h-3 rounded-2xl bg-sketelon"></p>
            <p className="truncate text-mini text-grey w-full h-3 rounded-2xl bg-sketelon">
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
