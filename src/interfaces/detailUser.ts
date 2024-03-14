import { IPreviewPhoto } from "./collection";
import { IUser } from "./user";

export interface IDetailUser extends IUser {
  followed_by_user: boolean;
  photos: IPreviewPhoto[];
  badge: Badge;
  tags: any;
  followers_count: number;
  following_count: number;
  allow_messages: boolean;
  numeric_id: number;
  downloads: number;
  meta: Meta;
}

export interface Badge {
  title: string;
  primary: boolean;
  slug: string;
  link: any;
}

export interface Meta {
  index: boolean;
}
