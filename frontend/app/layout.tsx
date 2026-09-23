import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyTrip — Explore. Plan. Travel.",
  description:
    "Discover destinations, experiences, travel routes and useful travel information with EasyTrip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}