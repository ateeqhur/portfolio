import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "Ateeqh Ur Rehman | Software Engineer",
  description:
    "Ateeqh Ur Rehman builds backend systems, data platforms, and practical generative AI applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
