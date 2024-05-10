import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-gradient-circle flex flex-col items-center`}>
        <div className="container">
          <img className="mx-5 cursor-pointer" src={'/logo.png'} width={120} height={100} alt='logo'/>
          <img className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"  src={'/vader.png'} width={500} height={500} alt='bg-vader'/>
        {children}
        </div>
      </body>
    </html>
  );
}
