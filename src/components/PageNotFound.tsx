import * as React from "react";
import Link from "next/link";
export interface IPageNotFoundProps {}

export default function PageNotFound(props: IPageNotFoundProps) {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-7xl text font-bold">Page not found</p>
        <p className="text-nor">
          Hmm, the pgae you were looking for doesn&apos;t seem to exist anymore.
        </p>
        <Link href={"/"} className="my-4">
          <button className="h-11 px-4 border hover:border-black rounded-lg">
            Back to Unsplash
          </button>
        </Link>
      </div>
    </div>
  );
}
