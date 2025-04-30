import { create } from "zustand";

type AuthType = {
    token: string;
    loading: boolean;

    setLoading: (loading: boolean) => void;
    setToken: (string: string) => void;

};

export const useAuth = create<AuthType>((set) => ({
    token: "",
    loading: true,

    setLoading: (loading) => set({
        loading: loading
    }),
    setToken: (token) => set({
        token: token
    }),
}));