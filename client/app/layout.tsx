import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars",
  description: "Challenge of Star Wars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} h-screen bg-gradient-circle flex flex-col items-center`}>
        <div className="container">
          <div className="flex w-full">
            <Link href={'/'} className="mx-auto sm:mx-0">
              <img className="md:mx-5 cursor-pointer" src={'/logo.png'} width={120} height={100} alt='logo'/>
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
