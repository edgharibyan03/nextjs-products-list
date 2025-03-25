import type { Metadata } from "next";
import "./globals.scss";
import { MainProvider } from "@/contexts/MainContext";

export const metadata: Metadata = {
  title: "Products List"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
