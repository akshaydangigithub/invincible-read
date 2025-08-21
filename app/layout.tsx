import type { Metadata } from "next";
import "./globals.css";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import ContextProvider from "@/context";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { LenisProvider } from "@/components/providers/LenisProvider";
import LoadingScreen from "@/components/Loader";
import MobileMenu from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "INVINCIBLE READ – Web3 Knowledge Revolution",
  description:
    "Join the INVI presale. Learn. Earn. Share. $READ token sale is live!",
  openGraph: {
    title: "INVINCIBLE READ",
    description: "Join the $READ presale and unlock Web3 knowledge rewards.",
    url: "https://invincibleread.com",
    siteName: "INVINCIBLE READ",
    images: [
      {
        url: "https://invincibleread.com/og-banner.png",
        width: 1200,
        height: 630,
        alt: "INVINCIBLE READ Private Sale",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INVINCIBLE READ Private Sale",
    description: "Learn and earn with $READ tokens.",
    images: ["https://invincibleread.com/og-banner.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookies = (await headers()).get("cookie") ?? null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* ✅ Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2XM66184E0"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2XM66184E0');
            `,
          }}
        />
      </head>
      <body className="bg-black text-white font-montserrat overflow-x-hidden mx-auto">

        {/* 🔥 Full-page loader */}
        {/* <LoadingScreen /> */}
        <ContextProvider cookies={cookies}>
          <LenisProvider>
            <TopBanner />
            <MobileMenu />
            <div style={{ paddingTop: "42px" }}>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </LenisProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
