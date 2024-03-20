import { redirect } from "next/navigation";

export interface ISearchProps {}

export default function Search(props: ISearchProps) {
  redirect("/");
}
