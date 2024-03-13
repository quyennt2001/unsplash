import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_ACCESS_KEY?.split(",") || "";
let keyIdx = 0;
//  || 'Tat0iOoBBA2FAL8bd_nrQXL8qWWOz40zKVsRmqCxBL4';

const api = axios.create({
  // baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Client-ID ${CLIENT_ID[keyIdx]}`,
  // },
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
    if (error.response && error.response.status === 403) {
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
