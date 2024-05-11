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
          <Link href={'/'}>
            <img className="mx-auto md:mx-5 cursor-pointer" src={'/logo.png'} width={120} height={100} alt='logo'/>
          </Link>
          <img className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] hidden lg:block xl:w-96 lg:w-48"  src={'/vader.png'} width={400} height={400} alt='bg-vader'/>
        {children}
        </div>
      </body>
    </html>
  );
}
