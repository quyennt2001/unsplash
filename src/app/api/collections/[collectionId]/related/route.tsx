import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  const clientId = process.env.CLIENT_ID;
  const searchParam = request.nextUrl.searchParams;
  const res = await fetch(
    `https://api.unsplash.com/collections/${params?.collectionId}/related?client_id=${clientId}`
  );
  const data = await res.json();
  return Response.json({ data });
}
