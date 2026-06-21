import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wajahat Mustafa — Wedding Invitation",
  description: "You are cordially invited to celebrate the wedding of Wajahat Mustafa. Barat: 10 September 2026 | Walima: 12 September 2026",
  openGraph: {
    title: "Wajahat Mustafa — Wedding Invitation",
    description: "A celebration of love, union, and new beginnings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
