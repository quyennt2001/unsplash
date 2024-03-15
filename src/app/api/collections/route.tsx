import { BASE_URL, CLIENT_ID } from "../axiosConfig";
import { type NextRequest, NextResponse } from "next/server";

let keyIdx = 0;
export async function GET(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams;
  const page = searchParam.get("page");
  const per_page = searchParam.get("per_page");
  const res = await fetch(
    `${BASE_URL}/collections?client_id=${CLIENT_ID[keyIdx]}&page=${page}${
      per_page ? `&per_page=${per_page}` : ""
    }`
  );
  if (res.status === 403) {
    keyIdx = (keyIdx + 1) % CLIENT_ID.length;
    return GET(request);
  }
  if (res.status !== 200) {
    return NextResponse.json(await res.json(), { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
