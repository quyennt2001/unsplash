import LoginClient from "@/components/login/LoginClient";
import * as React from "react";
import { getCurrentUser, handleLogin } from "@/services/authenService";

// export interface ILoginSuccessProps {
//   access_token: string;
//   created_at: number;
//   refresh_token: string;
//   scope_type: string;
//   user_id: number;
//   username: string;
// }

// export interface ILoginFailProps {
//   error: string;
//   error_description: string;
// }

export default async function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const data = await handleLogin(searchParams.code);
  // console.log(data)
  if (!data) {
    return <LoginClient data={data} />;
  }
  const user = await getCurrentUser(data?.access_token);
  return <LoginClient data={data} user={user} />;
}
