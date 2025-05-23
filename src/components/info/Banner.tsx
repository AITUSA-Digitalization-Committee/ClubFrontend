import { useEffect, useState } from "react";

import { IClub } from "@/types";
import { api } from "@/api/instance";
import { useAuth } from "@/hooks/auth";

function Banner({ club }: { club: IClub }) {
  const [bannerUrl, setBannerUrl] = useState<string | undefined>();
  const { token } = useAuth();
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await api.get(`/images/${club.id}/banner`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setBannerUrl(imageUrl);
      } catch (error) {
        console.error("Ошибка загрузки логотипа:", error);
      }
    };

    fetchLogo();
  }, [club.id, token]);
  return (
    <div className="bg-muted rounded-2xl h-40 overflow-hidden">
      <img src={bannerUrl} className="object-contain w-full h-full" />
    </div>
  );
}

export default Banner;
