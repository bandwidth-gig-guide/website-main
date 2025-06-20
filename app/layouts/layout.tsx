import type { Metadata } from "next";
import { font_primary, font_secondary } from "@/styles/fonts";
import "./global.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font_primary.variable} ${font_secondary.variable}`}>
        {children}
      </body>
    </html>
  );
}

// Metadata

export const metadata: Metadata = {
  title: "Bandwidth",
  description: "Melbourne Gig Guide",
};