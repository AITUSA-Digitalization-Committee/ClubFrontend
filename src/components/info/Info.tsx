"use client";

import { IClub } from "@/types";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { api } from "@/api/instance";
import Container from "../Container";

interface Props {
  club: IClub;
}

function Info({ club }: Props) {
  const { token } = useAuth();
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    api
      .get(`clubs/${club.id}/isAdmin`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAdmin(response.data);
      });
  }, [token]);
  console.log(admin);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-2xl">{club?.title}</div>

        {admin ? (
          <Link className="p-2" href={"admin/" + club.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-primary"
              viewBox="0 -960 960 960"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </Link>
        ) : (
          <Container></Container>
        )}
      </div>

      <div className="bg-muted rounded-2xl p-5 h-64 overflow-y-scroll">
        {club?.description}
      </div>
    </div>
  );
}

export default Info;
