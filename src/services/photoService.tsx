import { BASE_URL, CLIENT_ID } from ".";

const URL = `${BASE_URL}/photos`;

let keyIdx = 0;

export async function likePhoto(id: string, accessToken: string) {
  return fetch(`${URL}/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch((e) => console.log("Error like photo ->", e));
}

export async function unlikePhoto(id: string, accessToken: string) {
  return fetch(`${URL}/${id}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error like photo ->", e));
}

export async function getAPhoto(slug: string, accessToken: string) {
  return fetch(`${BASE_URL}/photos/${slug}`, {
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
        getAPhoto(slug, accessToken);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error in get a photo", e));
}

export async function getARandomPhoto() {
  return fetch(`${BASE_URL}/photos/random`, {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = keyIdx + 1;
        getARandomPhoto();
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .then((data) => data)
    .catch((e) => console.log("Error in get a random photo", e));
}

export async function getFirstPagePhoto(accessToken: string) {
  return fetch(`${BASE_URL}/photos?page=1`, {
    headers: {
      Authorization: accessToken
        ? `Bearer ${accessToken}`
        : `Client-ID ${CLIENT_ID[keyIdx]}`,
    },
  })
    .then( async (res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 403 && keyIdx < CLIENT_ID.length) {
        keyIdx = keyIdx + 1;
        await getFirstPagePhoto('');
        // return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log("Error in list image", e));
}
