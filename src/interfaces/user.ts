export interface IUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: any;
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
