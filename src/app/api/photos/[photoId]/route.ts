import { type NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {photoId: string}}) {
  const clientId = process.env.CLIENT_ID;
  const searchParam = request.nextUrl.searchParams;
  const page = searchParam.get("page");
  const res = await fetch(
    `https://api.unsplash.com/photos/${params?.photoId}?client_id=${clientId}&page=${page}`
  );
  const data = await res.json();
  return Response.json({ data });
}
