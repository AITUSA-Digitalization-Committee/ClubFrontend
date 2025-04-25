import { create } from "zustand";

type AuthType = {
  token: string;
  setToken: (token: string) => void;
};

export const useAuth = create<AuthType>((set) => ({
  token: "",
  setToken: (token) =>
    set({
      token: token,
    }),
}));
