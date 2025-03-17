import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "HCN by BSWS ",
  description: "Link status checking site",
};

const inter = localFont({
  src: [
    {
      path: "../assets/fonts/Inter-VariableFont.ttf",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased mx-auto max-w-3xl`}>
        <Navbar />
        <div className="h-22"></div>
        {children}
        <Toaster closeButton richColors />
      </body>
    </html>
  );
}
