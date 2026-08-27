import Script from "next/script";
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Travelio - Travel Agency Framer Template',
  description: 'Fully responsive Next.js 15 App exported from Clonero Studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/react.BlJwgj38.mjs" strategy="beforeInteractive" />
        <Script src="/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/motion.BTFsJANr.mjs" strategy="beforeInteractive" />
        <Script src="/framerusercontent/sites/4I8jtuL0GyWoXILTgNi7Sz/script_main.O6xM-HsT.mjs" strategy="beforeInteractive" type="module" />
      </head>
      <body>{children}</body>
    </html>
  );
}
