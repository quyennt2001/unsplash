"use client";

import * as React from "react";
import { tokenStore, userStore } from "@/store/userStore";
import { toastStore } from "@/store/toastStore";
import { useRouter } from "next/navigation";
import { ICurrentUser } from "@/interfaces/user";

export interface ILoginClientProps {
  data: any;
  user: ICurrentUser | null;
}

export default function LoginClient(props: ILoginClientProps) {
  const router = useRouter();
  const { setAccessToken } = tokenStore();
  const { setUser } = userStore();
  const { setToast } = toastStore();
  const { data } = props;
  if (!data) {
    setToast("Login failed!");
    router.push("/");
  } else {
    setAccessToken(data.access_token);
    setUser(props.user);
    setToast("You're already logged in");
    router.push("/");
  }
  return <div>Loading...</div>;
}
