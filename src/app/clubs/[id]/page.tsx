"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Club } from "@/models/club";
import xior from "xior";
import MemberModal from "@/components/MemberModal";

interface Props {
  params: {
    id: string;
  };
}

function SoloClub({ params }: Props) {
  const router = useRouter();
  const pl: Club = {
    id: "1",
    title: "Another Club",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    logo: "/public/image.png",
    banner: "/string",
    members: ["240315"],
  };
  const [clubData, setClubData] = useState<Club>(pl);

  useEffect(() => {
    xior.get("/clubs/" + params.id).then((response) => {
      setClubData(response.data.data);
    });
  }, [clubData]);

  return (
    <div className="club">
      <div>
        <button onClick={() => router.back()} className=" border-2 p-1">
          Назад
        </button>
      </div>
      <div className="p-4">
        <div className="w-full h-64 relative overflow-hidden rounded-xl border-2 border-gray-300">
          <Image
            src="/image.png" // путь к изображению
            alt="Баннер клуба"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
      <div>
        <div>Club Name</div>
        <button className="border-2 p-1">Edit</button>
      </div>
      <div className="border-0 rounded-b-sm">Club desc</div>
      <div className="members">
        Участники({3})
        <MemberModal />
      </div>
    </div>
  );
}

export default SoloClub;
