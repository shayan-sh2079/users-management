import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "user management",
  description: "User management app with Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body dir={"rtl"}>
        <main>{children}</main>
      </body>
    </html>
  );
}
