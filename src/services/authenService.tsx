import {
  BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  GRANT_TYPE,
} from ".";

let keyIdx = 0;

export async function handleLogin(code: string) {
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
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx += 1;
        handleLogin(code);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error login ->", e));
}

