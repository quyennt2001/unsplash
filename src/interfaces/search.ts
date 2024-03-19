import { ICollection } from "./collection";
import { IPhoto } from "./photo";
import { IUser } from "./user";

export interface IResultSearch {
  total: number;
  total_pages: number;
}

export interface IResultSearchUser extends IResultSearch {
  results: IUser[];
}

export interface IResultSearchCollection extends IResultSearch {
  results: ICollection[];
}

export interface IResultSearchPhoto extends IResultSearch {
  results: IPhoto[];
}
