import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "hc",
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
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster closeButton richColors />
      </body>
    </html>
  );
}
