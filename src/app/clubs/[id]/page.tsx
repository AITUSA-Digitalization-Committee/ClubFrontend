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
  const { token } = useAuth();

  const [club, setClub] = useState<IClub>();
  const [loading, setLoading] = useState(true);

  const fetchClub = async () => {
    await api.get<ApiResponse<IClub>>(`/clubs/get/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(({ data }) => {

        if (data.statusCode != 200) {
          toast.error(data.message);
          return;
        }

        setClub(data.data);

      }).catch(() => {
        toast.error('Не удалось загрузить данные клуба');
      }).finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (token == "") {
      return;
    }
    fetchClub();
  }, [id, token])

  if (loading || !club) {
    return <Loading className="h-dvh" />;
  }

  const props = {
    club: club
  }

  return (
    <View container className="gap-6 relative">

      <Banner {...props} />
      <Info {...props} />

      <Members {...props} />
      <Modal />

    </View>
  );
}

export default ClubPage;
