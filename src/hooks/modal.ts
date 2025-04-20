import { IMember } from "@/types";
import { create } from "zustand";

type MemberType = {
    selectedMember: IMember | undefined;
    setSelectedMember: (selectedMember: IMember | undefined) => void;
};

export const useModal = create<MemberType>((set) => ({
    selectedMember: undefined,
    setSelectedMember: (selectedMember) => set({
        selectedMember: selectedMember
    }),
}));



