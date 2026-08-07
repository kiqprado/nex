import type { Metadata } from "next";

import { WorkOutProvider } from '@/app/context/workout-context'

import "./styles/globals.css";

import { Orbitron, Gruppo  } from "next/font/google";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      className={`${orbitron.variable} font-orbitron
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
