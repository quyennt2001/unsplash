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
