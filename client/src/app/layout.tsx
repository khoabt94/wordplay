import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import Transition from "@/components/transition";
import Header from "@/components/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordplay App",
  description: "Funny word games with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark text-foreground bg-background`}>
        <NextUIProvider>
          <main className="h-screen max-w-6xl mx-auto">
            <Header />
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
