"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import xior from "xior";
import { Member } from "@/models/member";
import { memberClub } from "@/models/memberClubs";

export default function MemberModal({ member }: { member: Member }) {
  const [isOpen, setIsOpen] = useState(false);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const AnimatedDiv = animated(motion.div);
  const [memberClubs, setMemberClubs] = useState<memberClub[]>([]);

  const open = () => {
    setIsOpen(true);
    api.start({ y: 0 });
  };

  useEffect(() => {
    xior
      .get(`http://127.0.0.1:8000/clubs/member/${member.barcode}/clubs`)
      .then((res) => {
        setMemberClubs(res.data.data);
      });
  }, [member]);

  const close = () => setIsOpen(false);

  const bind = useDrag(
    ({ last, movement: [, my] }) => {
      if (last && my > 200) {
        close();
      } else {
        api.start({ y: last ? 0 : my });
      }
    },
    { from: () => [0, y.get()] },
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <button
        onClick={open}
        className="w-full text-left px-4 py-2 bg-white border rounded-xl shadow-sm hover:bg-gray-50"
      >
        {member.name + " " + member.surname}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 flex items-end"
          >
            <AnimatedDiv
              {...bind()}
              style={{ y }}
              className="w-full bg-white rounded-t-2xl p-4 pb-8"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-bold text-center mb-4">
                {member.name + " " + member.surname}
              </h2>

              <div className="text-sm font-medium mb-2">Клубы</div>
              <div className="space-y-2">
                {memberClubs.map((club) => (
                  <div key={club.title} className="px-4 py-2 border rounded-lg">
                    {club.title}
                  </div>
                ))}
              </div>
            </AnimatedDiv>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
