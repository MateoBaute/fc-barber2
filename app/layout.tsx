import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

import { MyAppContextProvider } from './context/myAppContext'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FC Barber - Tu barbería de confianza",
  description: "Tu barbería de confianza en el corazón de la ciudad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-gray-800 dark:text-gray-300`}>
        <MyAppContextProvider>
          <Header />
          <main className=" w-[100%] flex-grow text-center p-4">
            {children}
          </main>
        </MyAppContextProvider>
      </body>
    </html>
  );
}
