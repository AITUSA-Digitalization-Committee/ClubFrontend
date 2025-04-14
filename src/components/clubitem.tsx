"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Club } from "@/models/club";

function ClubItem({ club }: { club: Club }) {
  const router = useRouter();
  return (
    <div
      className="flex items-center border-2 rounded-2xl p-4 min-w-80 m-4"
      onClick={() => router.push(`/clubs/${club.id}`)}
    >
      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative">
        <Image
          src={"/" + club.logo}
          alt=""
          width={500} // required
          height={500} // required
          className="rounded-full object-cover border-2"
        />
      </div>

      <div className="ml-4 sm:ml-6 md:ml-8">
        <h3 className="text-xl font-semibold">{club.title}</h3>
        <p className="text-sm text-gray-700 max-w-xs">{club.description}</p>
      </div>
    </div>
  );
}

export default ClubItem;
