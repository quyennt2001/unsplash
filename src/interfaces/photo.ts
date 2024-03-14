import { IUser } from "./user";

export interface IPhoto { // photo in collection 
  id: string;
  slug: string;
  alternative_slugs: IAlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: IUrls;
  links: IPhotoLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: ISponsorship;
  topic_submissions: ITopicSubmissions;
  user: IUser;
}

export interface IAlternativeSlugs {
  en: string;
  es?: string;
  ja?: string;
  fr?: string;
  it?: string;
  ko?: string;
  de?: string;
  pt?: string;
}

export interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface IPhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface ISponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: IUser;
}



export interface ITopicSubmissions {
  animals?: IItemTopicSubmissions;
  blue?: IItemTopicSubmissions;
  nature?: IItemTopicSubmissions;
  "fashion-beauty"?: IItemTopicSubmissions;
  experimental?: IItemTopicSubmissions;
  "textures-patterns"?: IItemTopicSubmissions;
  "architecture-interior"?: IItemTopicSubmissions;
  "color-of-water"?: IItemTopicSubmissions;
  wallpapers?: IItemTopicSubmissions;
  health?: IItemTopicSubmissions;
}

export interface IItemTopicSubmissions {
  status: string;
  approved_on: string;
}


