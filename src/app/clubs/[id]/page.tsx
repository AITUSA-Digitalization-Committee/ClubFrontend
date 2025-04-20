"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Club } from "@/models/club";
import xior from "xior";
import MemberModal from "@/components/MemberModal";
import { Member } from "@/models/member";

function SoloClub() {
  const router = useRouter();
  const params = useParams(); // 👈 получаем параметры из URL
  const clubId = params.id as string; // 👈 получаем id из URL

  const [clubData, setClubData] = useState<Club>();
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState<string>("");
  const [display, setDisplay] = useState<Member[]>([]);

  useEffect(() => {
    xior.get(`http://127.0.0.1:8000/clubs/get/${clubId}`).then((response) => {
      const club = response.data.data;
      setClubData(club);
      setMembers(club.members ?? []);
    });
  }, [clubId]);

  useEffect(() => {
    setDisplay(
      members.filter((c) =>
        (c.name.toLowerCase() + " " + c.surname.toLowerCase()).includes(
          search.toLowerCase(),
        ),
      ),
    );
  }, [search, members]);

  return (
    <div className="club">
      <div>
        <button onClick={() => router.back()} className=" border-2 p-1">
          Назад
        </button>
      </div>
      <div className="Banner p-4">
        <div className="w-full h-64 relative overflow-hidden rounded-xl border-2 border-gray-300">
          {clubData?.banner && clubData.banner.startsWith("http") ? (
            <Image
              src={clubData.banner}
              alt="Баннер клуба"
              fill
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              Нет баннера
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center ">
        <div className="font-bold">{clubData?.title}</div>
        {true && (
          <button
            className="border-2 p-1"
            onClick={() => {
              router.push("admin/" + 1);
            }}
          >
            Edit
          </button>
        )}
      </div>
      <div className="border-0 rounded-b-sm">{clubData?.description}</div>
      <div className="flex flex-col p-4">
        <div>Участники({clubData?.members?.length})</div>
        <div className="flex-row p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск"
              className="w-full p-2 border border-gray-300 rounded-md pl-10"
              onInput={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {display.map((member, index) => (
          <MemberModal key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

export default SoloClub;
