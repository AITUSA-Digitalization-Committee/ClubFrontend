"use client";
import { useEffect, useState } from "react";
import { Club } from "@/models/club";
import xior from "xior";
import ClubItem from "../../components/clubitem";

function Clubs() {
  const pl: Club[] = [
    {
      id: "2",
      title: "Club example",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      logo: "string",
      banner: "string",
      members: [],
    },
  ];

  const [clubs, setClubs] = useState<Club[]>(pl);
  const [search, setSearch] = useState<string>("");
  const [display, setDisplay] = useState<Club[]>([]);

  useEffect(() => {
    xior.get("http://127.0.0.1:8000/clubs/all").then((resp) => {
      setClubs(resp.data.data);
    });

    setDisplay(
      clubs.filter((c) =>
        c.title.toLowerCase().includes(String(search.toLowerCase())),
      ),
    );
  }, [search, clubs]);

  return (
    <div>
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
      <div className="clubs flex-col pb-16  justify-center max-w-screen">
        {display.map((club, index) => (
          <ClubItem key={index} club={club} />
        ))}
      </div>
    </div>
  );
}

export default Clubs;
