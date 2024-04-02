import { create } from "zustand";
import Cookies from "js-cookie";
import { IUser, ICurrentUser } from "@/interfaces/user";
import { persist, createJSONStorage } from "zustand/middleware";

interface CurrentUserState {
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser) => void;
  clearUser: () => void;
}

export const userStore = create<CurrentUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: ICurrentUser) => set({ user: user }),
      clearUser: () => {
        set({ user: null })
        localStorage.removeItem('user-store')
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage<CurrentUserState>(() => localStorage)
    }
  )
);

interface TokenState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  clearToken: () => void;
}

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
