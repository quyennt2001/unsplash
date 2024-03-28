export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const CLIENT_ID = process.env.NEXT_PUBLIC_ACCESS_KEY?.split(",") || "";
export const CLIENT_SECRET = process.env.NEXT_PUBLIC_SECRET_KEY?.split(",") || [];
export const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
export const GRANT_TYPE = "authorization_code";