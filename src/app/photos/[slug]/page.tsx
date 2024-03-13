import * as React from "react";
import PhotoDetail from "@/components/photo/PhotoDetail";

export default function PhotoPage({ params }: { params: { slug: string } }) {

  return <PhotoDetail slug={params.slug} sticky={62} />;
}
