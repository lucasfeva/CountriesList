import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import Link from "next/link";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Paises",
  description: "Listagem de paises e suas informações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className="bg-[#202020] text-white min-h-screen flex flex-col items-center">
          <nav className="w-full bg-[#101010] h-16 flex justify-center">
            <section className="container flex items-center gap-3">
              <Image
                width={48}
                height={48} 
                src="/Logo.svg" 
                alt="Mapa Mundi"
              />
              <h1 className="font-bold text-2xl">Lista de Países</h1>
            </section>
          </nav>
          {children}
          </main>
      </body>
    </html>
  );
}
