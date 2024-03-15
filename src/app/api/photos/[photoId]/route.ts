import { NextResponse, type NextRequest } from "next/server";
import { BASE_URL, CLIENT_ID } from "../../axiosConfig";

let keyIdx = 0
export async function GET(request: NextRequest, {params}: {params: {photoId: string}}) {
  const res = await fetch(
    `https://api.unsplash.com/photos/${params?.photoId}?client_id=${CLIENT_ID[keyIdx]}`
  );
  if(res.status === 403) {
    keyIdx = (keyIdx + 1) % CLIENT_ID.length
    return GET(request, {params})
  }
  if(res.status !== 200) {
    return NextResponse.json(await res.json(), {status: res.status})
  }
  const data = await res.json();
  return Response.json(data);
}
