import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import Header from "@/components/header";
import { Toaster } from "@/components/toast/toaster";
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
          <Header />
          <Toaster />
          <main className="h-screen max-w-6xl mx-auto px-4 pt-4">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
