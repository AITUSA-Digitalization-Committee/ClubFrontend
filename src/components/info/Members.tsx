'use client'

import { IClub } from "@/types";
import Search from "../Search";
import { useSearch } from "@/hooks/search";
import { useModal } from "@/hooks/modal";

function Members({ club }: { club: IClub }) {
    const { search } = useSearch();
    const { setSelectedMember } = useModal();

    return (
        <div className="flex flex-col gap-2">
            <div className="text-2xl font-semibold">Участники ({club?.members?.length})</div>

            <Search />

            {club.members.length == 0
                ? (
                    <div className="opacity-50 w-full mt-6 flex justify-center">
                        Нет участников :(
                    </div>
                )
                : (
                    <>
                        {club?.members.filter((c) =>
                            (c.name.toLowerCase() + " " + c.surname.toLowerCase()).includes(
                                search.toLowerCase(),
                            ),
                        ).map((member, index) => (
                            <div key={index} className="bg-muted rounded-2xl px-6 py-3 font-medium"
                                onClick={() => {
                                    setSelectedMember(member)
                                }}
                            >
                                {member.name + " " + member.surname}
                            </div>
                        ))}
                    </>
                )
            }

        </div>
    );
}

export default Members;