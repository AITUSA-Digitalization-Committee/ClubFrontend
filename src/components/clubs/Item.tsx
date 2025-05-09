"use client";

import { IClub } from "@/types";
import { useState, useEffect } from "react";
import { api } from "@/api/instance";
import Link from "next/link";
import Authorize from "../Authorize";
import { useAuth } from "@/hooks/auth";

interface ItemProps {
  club: IClub;
}

function Item({ club }: ItemProps) {
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const { token } = useAuth();
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await api.get(`/images/${club.id}/logo`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setLogoUrl(imageUrl);
      } catch (error) {
        console.error("Ошибка загрузки логотипа:", error);
      }
    };

    fetchLogo();
  }, [club.id, token]);

  return (
    <Link
      className="flex gap-4 items-center rounded-2xl p-5 bg-muted"
      href={`/clubs/${club?.id}`}
    >
      <div className="bg-muted-dark min-h-16 min-w-16 rounded-full overflow-hidden">
        <img src={logoUrl} className="object-cover h-16 w-16 border-none" />
      </div>

      <div>
        <h3 className="text-xl font-semibold">{club?.title}</h3>
        <p className="text-sm text-dark-light-gray text-wrap line-clamp-3">
          {club?.description}
        </p>
      </div>
    </Link>
  );
}

export default Item;
