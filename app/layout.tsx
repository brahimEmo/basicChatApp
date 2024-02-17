import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Brahim Chat",
  description: "a small chat app for friends.",
};

export default function RootLayout({ children }: any) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
