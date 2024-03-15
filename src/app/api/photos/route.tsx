import { NextResponse, type NextRequest } from "next/server";
import { BASE_URL, CLIENT_ID } from "../axiosConfig";

let keyIdx = 0;
export async function GET(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams;
  const page = searchParam.get("page");
  const res = await fetch(
    `${BASE_URL}/photos?client_id=${CLIENT_ID[keyIdx]}&page=${page}`
  );
  if (res.status === 403) {
    keyIdx = (keyIdx + 1) % CLIENT_ID.length;
    return GET(request);
  }
  if (res.status !== 200) {
    return NextResponse.json(await res.json(), { status: res.status });
  }
  const data = await res.json();
  return Response.json(data);
}
