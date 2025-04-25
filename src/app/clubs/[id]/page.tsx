"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiResponse, IClub } from "@/types";
import View from "@/components/View";
import { api } from "@/api/instance";
import Banner from "@/components/info/Banner";
import Info from "@/components/info/Info";
import Members from "@/components/info/Members";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import Modal from "@/components/info/MemberModal";
import { useAuth } from "@/hooks/auth";

function ClubPage() {
  const { id } = useParams();
  const [club, setClub] = useState<IClub>();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchClub = async (authToken: string) => {
    if (!id) {
      toast.error("Некорректный ID клуба");
      setLoading(false);
      return;
    }

    console.log("📡 Запрос клуба с ID:", id);
    try {
      const { data } = await api.get<ApiResponse<IClub>>(`/clubs/get/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (data.statusCode !== 200) {
        toast.error(data.message || "Ошибка получения данных клуба");
        return;
      }

      setClub(data.data);
    } catch (error) {
      console.error("❌ Ошибка при получении данных клуба:", error);
      toast.error("Не удалось загрузить данные клуба");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchClub(token);
    }
  }, [token]);

  // Пока нет токена или загрузка идёт — показываем лоадер
  if (loading || !token || !club) {
    return <Loading className="h-dvh" />;
  }

  return (
    <View container className="gap-6 relative">
      <Banner club={club} />
      <Info club={club} />
      <Members club={club} />
      <Modal />
    </View>
  );
}

export default ClubPage;
