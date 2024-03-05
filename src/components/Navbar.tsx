import * as React from "react";
import Button from "./Button";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  return (
    <div className="sticky top-[62px] bg-white h-14 text-sm z-10">
      <div className="flex">
        <div className="flex gap-10 border-b ">
          <div className="flex gap-6 border-b-1 border-b-black items-center">
            <div className="flex gap-6 items-center">
              <Button name="editorial" selected={true} />
              <Button name="unsplash+" selected={false} />
              <span className="h-8 w-[2px] border-r-2 border-r-border"></span>
            </div>
            <div className="flex gap-6 overflow-x-scroll no-scrollbar w-[1289px] relative">
              <div className="absolute right-0 top-0 h-14 flex items-center z-10 bg-white">
                <button className="px-2 h-10 text-grey hover:text-black">
                  <MdOutlineNavigateNext className="h-7 w-7 " />
                </button>
              </div>
              {/* <div className="absolute left-0 top-0 h-14 flex items-center z-10 bg-white">
                <button className="px-2 h-10 text-grey hover:text-black">
                  <GrFormPrevious className="h-7 w-7 " />
                </button>
              </div> */}
              <Button name="spring" span="featured" selected={false} />
              <Button name="wallpapers" selected={false} />
              <Button name="nature" selected={false} />
              <Button name="3D renders" selected={false} />
              <Button name="travel" selected={false} />
              <Button name="architecture & interiors" selected={false} />
              <Button name="textures & patterns" selected={false} />
              <Button name="street photography" selected={false} />
              <Button name="film" selected={false} />
              <Button name="archival" selected={false} />
              <Button name="experimental" selected={false} />
              <Button name="animals" selected={false} />
              <Button name="fashion & beauty" selected={false} />
              <Button name="people" selected={false} />
              <Button name="spirituality" selected={false} />
              <Button name="business & work" selected={false} />
              <Button name="food & drink" selected={false} />
              <Button name="health & wellness" selected={false} />
              <Button name="sports" selected={false} />
              <Button name="current events" selected={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
