import "./globals.css";
import { Questrial, Manrope } from "@next/font/google";
import "yet-another-react-lightbox/styles.css";
import Client from "@/components/utils/Client";
import { Metadata } from "next";

const questrail = Questrial({
  weight: "400",
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-quest",
});
const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Univora | Home",
  description: "Showcase your business and products at your school",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["univora"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Rightson Tole" },
    {
      name: "Rightson Tole",
      url: "https://rightson.vercel.app/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` ${manrope.variable} ${questrail.variable} 
        font-manrope w-screen overflow-x-hidden `}
      >
        <Client>{children}</Client>
      </body>
    </html>
  );
}
