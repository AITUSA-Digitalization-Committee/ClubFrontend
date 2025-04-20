"use client";

import { IClub } from "@/types";
import Link from "next/link";

function Item({ club }: { club: IClub }) {

  return (
    <Link
      className="flex gap-4 items-center rounded-2xl p-5 bg-muted"
      href={`/clubs/${club?.id}`}
    >

      <div className="bg-muted-dark min-h-16 min-w-16 rounded-full overflow-hidden">
        <img
          src={club.logo}
          className="object-cover h-16 w-16 border-none"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold">{club?.title}</h3>
        <p className="text-sm text-dark-light-gray text-wrap line-clamp-3">{club?.description}</p>
      </div>

    </Link>
  );
}

export default Item;
