import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kawaeee's Web Portfolio",
  description: "Explore Kawaeee's latest web portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
