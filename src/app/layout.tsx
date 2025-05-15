import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "DoIT Posts App",
  description: "A sample Next.js 14 app with posts CRUD functionality",
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
