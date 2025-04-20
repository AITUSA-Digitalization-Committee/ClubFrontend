import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Club front",
  description: "Developed by Norkin Dmitriy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <ToastContainer autoClose={2000} hideProgressBar={true} />

        {children}

      </body>
    </html>
  );
}
