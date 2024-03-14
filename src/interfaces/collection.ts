import { ITag } from "./detailPhoto";
import { IPhoto, IUrls } from "./photo";
import { IUser } from "./user";

export interface ICollection {
  // realted
  id: string;
  title: string;
  description: any;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: ITag[];
  links: ICollectionLinks;
  user: IUser;
  cover_photo: IPhoto;
  preview_photos: IPreviewPhoto[];
}

export interface IPreviewPhoto {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  urls: IUrls;
}

export interface ICollectionLinks {
  self: string;
  html: string;
  photos: string;
  related: string;
}
