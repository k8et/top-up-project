import ReduxProvider from "@/store/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: ["400", "500", "600", "700", "800"], subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Peyman admin",
  description: "media talk"
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  return (
    <html lang="ru">
      <body className={"animate-appearance min-h-screen flex flex-col " + inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
