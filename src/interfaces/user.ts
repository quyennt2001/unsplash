import { Tags } from "./detailUser";
import { IPhoto } from "./photo";

export interface ICurrentUser {
  accepted_tos: boolean;
  allow_message: boolean;
  badge: any;
  bio: string;
  confirmed: boolean;
  downloads: number;
  first_name: string;
  followed_by_user: boolean;
  followers_count: number;
  following_count: number;
  for_hire: boolean;
  id: string;
  instagram_username: string;
  last_name: string;
  links: IUserLinks;
  location: any;
  meta: {
    index: boolean;
  };
  name: string;
  numeric_id: number;
  photos: IPhoto[];
  portfolio_url: any;
  profile_image: IProfileImage;
  social: ISocial;
  tags: Tags;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  twitter_username: string;
  uid: string;
  updated_at: string;
  username: string;
}

export interface IUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: IUserLinks;
  profile_image: IProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: ISocial;
}

export interface IUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface IProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface ISocial {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: any;
}
