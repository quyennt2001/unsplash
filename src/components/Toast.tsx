"use client";

import { toastStore } from "@/store/toastStore";
import * as React from "react";

export interface IToastProps {}

export default function Toast(props: IToastProps) {
  const { mess, clear } = toastStore();
  if (mess) {
    setTimeout(() => {
      clear();
    }, 1500);
  }
  return (
    <>
      {mess && (
        <div className="fixed z-30 left-0 right-0 top-0 h-14 bg-grey flex justify-center items-center text-white text-nor">
          {mess}
        </div>
      )}
    </>
  );
}
