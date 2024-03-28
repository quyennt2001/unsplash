import { BASE_URL, CLIENT_ID } from ".";

let keyIdx = 0;
export async function search(category: string, query: string) {
  return fetch(`${BASE_URL}/search/${category}?query=${query}&per_page=20`, {
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
        search(category, query);
        return;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((e) => console.log("Error search ->", e));
}
