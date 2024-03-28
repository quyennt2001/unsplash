import { create } from "zustand";
import Cookies from "js-cookie";
import { IUser, ICurrentUser } from "@/interfaces/user";

interface CurrentUserState {
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | undefined) => void;
  clearUser: () => void;
}

interface TokenState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearToken: () => void;
}

export const userStore = create<CurrentUserState>((set) => ({
  user: JSON.parse(Cookies.get("current_user") || "null"),
  setUser: (user: ICurrentUser | undefined) => {
    set({ user: user });
    Cookies.set("current_user", JSON.stringify(user), { expires: 1 });
  },
  clearUser: () => {
    set({ user: null });
    Cookies.remove("current_user");
  },
}));

export const tokenStore = create<TokenState>((set) => ({
  accessToken: Cookies.get("access_token") || "",
  setAccessToken: (token: string) => {
    set({ accessToken: token });
    Cookies.set("access_token", token, { expires: 1 });
  },
  clearToken: () => {
    set({ accessToken: "" });
    Cookies.remove("access_token");
  },
}));
