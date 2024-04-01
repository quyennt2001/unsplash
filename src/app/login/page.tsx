import LoginClient from "@/components/login/LoginClient";
import * as React from "react";
import { getCurrentUser } from "@/services/userService";
import { handleLogin } from "@/services/authenService";

export default async function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const data = await handleLogin(searchParams.code);
  // console.log(data)
  if (!data) {
    return <LoginClient data={data} user={null} />;
  }
  const user = await getCurrentUser(data?.access_token);
  return <LoginClient data={data} user={user} />;
}
