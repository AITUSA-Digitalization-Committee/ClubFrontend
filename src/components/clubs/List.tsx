"use client";

import { useSearch } from "@/hooks/search";
import { ApiResponse, IClub } from "@/types";
import { useState, useEffect } from "react";
import Item from "./Item";
import { api } from "@/api/instance";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { useAuth } from "@/hooks/auth";

function List() {
  const { search } = useSearch();
  const { token } = useAuth();

  const [clubs, setClubs] = useState<IClub[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchClubs = async () => {
    await api
      .get<ApiResponse<IClub[]>>("/clubs/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        if (data.statusCode != 200) {
          toast.error(data.message);
          return;
        }

        setClubs(data.data);
      })
      .catch(() => {
        toast.error("Не удалось загрузить данные");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token == "") {
      return;
    }
    fetchClubs();
  }, [token]);

  if (loading) {
    return <Loading className="grow"></Loading>;
  }

  return (
    <div className="flex flex-col gap-4">
      {clubs
        .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
        .map((club, index) => (
          <Item key={index} club={club} />
        ))}
    </div>
  );
}

export default List;
