import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const CLIENT_ID = process.env.NEXT_PUBLIC_ACCESS_KEY?.split(",") || "";
let keyIdx = 0;

const api = axios.create({
});

api.interceptors.request.use(async (config) => {
  const url = BASE_URL;
  const apiKey = CLIENT_ID[keyIdx];
  config.headers.Authorization = `Client-ID ${apiKey}`;
  config.baseURL = url;
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      await rotateKey();
      return api(error.config);
    }
    throw error;
  }
);

const rotateKey = async () => {
  keyIdx = (keyIdx + 1) % CLIENT_ID.length;
};

export default api;
