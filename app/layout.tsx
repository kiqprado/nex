import type { Metadata } from "next";

import { WorkOutProvider } from '@/app/context/workout-context'

import "./styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nex. Beyond Limits",
  description: "Run, Walk... Move!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} 
        bg-zinc-950 text-zinc-100 h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col"
      >
        <WorkOutProvider>
          {children}
        </WorkOutProvider>
      </body>
    </html>
  );
}
