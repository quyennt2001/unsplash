import LoginClient from "@/components/login/LoginClient";
import * as React from "react";
import { BASE_URL } from "../api/apiConfig";

export interface ILoginSuccessProps {
  access_token: string;
  created_at: number;
  refresh_token: string;
  scope_type: string;
  user_id: number;
  username: string;
}

export interface ILoginFailProps {
  error: string;
  error_description: string;
}
let keyIdx = 0;
const CLIENT_ID = process.env.NEXT_PUBLIC_ACCESS_KEY?.split(",") || [];
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SECRET_KEY?.split(",") || [];
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const GRANT_TYPE = "authorization_code";

async function handleLogin(code: string) {
  return fetch(
    `https://unsplash.com/oauth/token?client_id=${CLIENT_ID[keyIdx]}&client_secret=${CLIENT_SECRET[keyIdx]}&redirect_uri=${REDIRECT_URI}&code=${code}&grant_type=${GRANT_TYPE}`,
    {
      method: "POST",
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403) {
        keyIdx += 1;
        handleLogin(code);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error login ->", e));
}

async function getUser(access_token: string) {
  return fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx += 1;
        await getUser(access_token);
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error get current user", e));
}

export default async function Login({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const data = await handleLogin(searchParams.code);
  if (!data) {
    return <LoginClient data={data} />;
  }
  const user = await getUser(data?.access_token);
  return <LoginClient data={data} user={user} />;
}
