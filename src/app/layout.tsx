import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unsplash Clone",
  description: "Unsplash Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full">
        <header className="z-30 sticky top-0">
          <Header />
        </header>
        <div className="w-full px-5">{children}</div>
      </body>
    </html>
  );
}
