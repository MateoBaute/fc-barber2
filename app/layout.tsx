import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-gray-800 dark:text-gray-300 flex flex-col min-h-screen`}>
        <MyAppContextProvider>
          <Header />
          <main className="w-full flex-grow text-center p-4">
            {children}
          </main>
          <Footer />
        </MyAppContextProvider>
      </body>
    </html>
  );
}
