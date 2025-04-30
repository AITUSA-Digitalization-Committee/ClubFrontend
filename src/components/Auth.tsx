'use client'

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/auth";

interface AuthProps {
    children?: ReactNode,
}

function Auth({ children }: AuthProps) {
    const { setToken } = useAuth();
    const { setLoading } = useAuth();

    { /* Получаем token */ }
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {

            if (event.data.type === "INIT") {
                console.log("Received token:", event.data.data)
                setToken(event.data.data);
                setLoading(false);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
        <>
            {children}
        </>
    );
}

export default Auth;