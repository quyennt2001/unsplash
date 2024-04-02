import { BASE_URL, CLIENT_ID } from ".";

const URL = `${BASE_URL}/collections`;

let keyIdx = 0;

export async function getFirstPageCollection(per_page: number) {
  return fetch(`${URL}?page=1&per_page=${per_page}`, {
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
        getFirstPageCollection(per_page);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log("Error collections first page", e));
}

export async function getCollection(collectionId: string, accessToken: string) {
  return fetch(`${URL}/${collectionId}`, {
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
        getCollection(collectionId, "");
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log("Error in collectionId", e));
}

export async function getPhotosOfCollection(
  collectionId: string,
  accessToken: string
) {
  return fetch(`${URL}/${collectionId}/photos`, {
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
        getPhotosOfCollection(collectionId, accessToken);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log("Error in collectionId", e));
}

export async function getRelatedCollections(
  collectionId: string,
  accessToken: string
) {
  return fetch(`${URL}/${collectionId}/related`, {
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
        getRelatedCollections(collectionId, accessToken);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log("Error in collectionId", e));
}
