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
      <body>{children}</body>
    </html>
  );
}
