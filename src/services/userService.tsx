import { ICurrentUser } from "@/interfaces/user";
import { BASE_URL, CLIENT_ID } from ".";

const URL = `${BASE_URL}/users`;

let keyIdx = 0;
export async function getPublicUser(username: string) {
  return fetch(`${URL}/${username}`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = keyIdx + 1;
        getPublicUser(username);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => {
      console.log("Error get public user", e);
    });
}

export async function getListOfUser(
  listname: string,
  username: string,
  accessToken: string
) {
  return fetch(`${URL}/${username}/${listname}`, {
    headers: {
      Authorization: accessToken
        ? `Bearer ${accessToken}`
        : `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = keyIdx + 1;
        getListOfUser(listname, username, accessToken);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => {
      console.log("Error get list of user", e);
    });
}

export async function updateCurrentUser(
  user: ICurrentUser | null,
  access_token: string
) {
  return fetch(`${BASE_URL}/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx += 1;
        updateCurrentUser(user, access_token);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => {
      console.log("Error update current user -> ", e);
    });
}

export async function getCurrentUser(access_token: string) {
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
        await getCurrentUser(access_token);
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error get current user", e));
}
