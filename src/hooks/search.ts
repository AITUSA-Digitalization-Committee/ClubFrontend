import { create } from "zustand";

type SearchType = {
    search: string;
    setSearch: (search: string) => void;
};

export const useSearch = create<SearchType>((set) => ({
    search: '',
    setSearch: (search) => set({
        search: search
    }),
}));



