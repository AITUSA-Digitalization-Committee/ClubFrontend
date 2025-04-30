"use client";

import { useState, useEffect } from "react";
import { IMemberClub } from "@/types";
import { useModal } from "@/hooks/modal";
import { api } from "@/api/instance";
import { useAuth } from "@/hooks/auth";

export default function Modal() {
  const { token } = useAuth();

  const { selectedMember, setSelectedMember } = useModal();

  const [memberClubs, setMemberClubs] = useState<IMemberClub[]>([]);

  const fetchMember = async () => {
    await api.get(`/clubs/member/${selectedMember?.barcode}/clubs`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        setMemberClubs(res.data.data);
      });
  }

  useEffect(() => {

    if (!selectedMember || token == '') {
      return;
    }

    fetchMember()
  }, [selectedMember, token]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaY = e.touches[0].clientY - startY;

      if (Math.abs(deltaY) > 50) {
        setIsExpanded(deltaY < 0); // Вверх → раскрыть, вниз → свернуть
        setIsDragging(false);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startY, isDragging]);

  if (!selectedMember) {
    return <></>
  }

  return (
    <>
      <div className="fixed bg-dark/25 bottom-0 left-0 w-screen h-dvh"
        onClick={() => {
          setSelectedMember(undefined);
        }}
      >

      </div>

      <div className={`absolute bottom-0 left-0 w-full bg-white rounded-t-4xl shadow-lg transition-all duration-200 overflow-y-scroll ${isExpanded ? 'h-[50dvh]' : 'h-[25dvh]'}`}
        style={{
          animationName: 'slide-up',
          animationDuration: '0.3s'
        }}
      >
        <div className="fixed mt-2 w-full flex justify-center">
          <div className="h-1.5 w-24 rounded-full bg-muted-dark" />
        </div>

        <div className="flex flex-col gap-6 px-4 mt-8">
          <div>
            <div className="text-2xl font-semibold">
              {selectedMember.name + ' ' + selectedMember.surname}
            </div>
            <div className="mt-1 text-dark-light-gray">
              {'#' + selectedMember.barcode}
            </div>
          </div>

          <div>
            <div className="text-xl font-semibold">
              Клубы
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {memberClubs.map((club, i) => {
                return (
                  <div key={i} className="bg-muted rounded-2xl py-3 px-4 flex items-center gap-4">
                    <div className="bg-muted-dark min-h-8 min-w-8 rounded-full overflow-hidden">
                      {/* Дима бля как ты пишешь где лого???? */}
                    </div>
                    <div className="text-xl font-medium">
                      {club.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
