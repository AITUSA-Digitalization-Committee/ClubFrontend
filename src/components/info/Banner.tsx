import { IClub } from "@/types";
import { api } from "@/api/instance";
import { useState, useEffect } from "react";

function Banner({ club }: { club: IClub }) {
  const [bannerUrl, setBannerUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await api.get(`/images/${club.id}/banner`, {
          responseType: "blob",
        });

        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setBannerUrl(imageUrl);
      } catch (error) {
        console.error("Ошибка загрузки логотипа:", error);
      }
    };

    fetchLogo();
  }, [club.id]);
  return (
    <div className="bg-muted rounded-2xl h-40 overflow-hidden">
      <img src={bannerUrl} className="object-contain w-full h-full" />
    </div>
  );
}

export default Banner;
