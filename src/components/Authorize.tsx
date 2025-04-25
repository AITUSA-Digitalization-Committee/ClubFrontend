"use client";

import { useAuth } from "@/hooks/auth";
import { ReactNode, useEffect } from "react";
import Loading from "./Loading";

interface AuthProps {
  children?: ReactNode;
}

function Authorize({ children }: AuthProps) {
  const { token, setToken } = useAuth();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "INIT") {
        setToken(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return <>{!token ? <Loading className="h-dvh" /> : <>{children}</>}</>;
}

export default Authorize;
