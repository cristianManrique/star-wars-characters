import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import StarField from "./components/StarField";
import "./globals.css";

const dinNextLTPro = localFont({
  src: [
    {
      path: "assets/fonts/din-next-lt-pro-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "assets/fonts/din-next-lt-pro-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-din",
});

export const metadata: Metadata = {
  title: "SWAPI Explorer",
  description: "Browse Star Wars characters via GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dinNextLTPro.variable} h-full antialiased`}>
      <body className={`${dinNextLTPro.className} h-full flex flex-col`}>
        <StarField />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
