import React from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevFlow",
  description: `A community where your programming questions are answered.
  Get Help, share knowledge, collaborate from other developers from around the world.
  Explore topics in web development, mobile development, blockchain technology, data structure and algorithm, e.t.c`,
  icons: "/assets/images/site-logo.svg",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/assets/images/site-logo.svg" />
        </head>
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <h1 className="h1-bold">This is a piece of text</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
