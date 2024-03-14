import { ICollection } from "./collection";
import { IPhoto, IPhotoLinks, IUrls } from "./photo";
import { IUser } from "./user";

export interface IDetailPhoto extends IPhoto {
  exif: IExif;
  location: ILocation;
  meta: IMeta;
  public_domain: boolean;
  tags: ITag[];
  tags_preview: ITagsPreview[];
  views: number;
  downloads: number;
  topics: any[];
  related_collections: IRelatedCollections;
}

export interface IExif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

export interface ILocation {
  name: any;
  city: any;
  country: any;
  position: IPosition;
}

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface IMeta {
  index: boolean;
}

export interface ITag {
  type: string;
  title: string;
  source?: ISource;
}

export interface ISource {
  ancestry: IAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: IPhoto;
}

export interface IAncestry {
  type: IItemAncestry;
  category: IItemAncestry;
  subcategory?: IItemAncestry;
}

export interface IItemAncestry {
  slug: string;
  pretty_slug: string;
}


export interface ITagsPreview {
  type: string;
  title: string;
}

export interface IRelatedCollections {
  total: number;
  type: string;
  results: ICollection[];
}


