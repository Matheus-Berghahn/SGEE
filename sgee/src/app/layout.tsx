// src/app/layout.tsx

import { Libre_Franklin } from 'next/font/google';
import './globals.css';

const libre_Franklin = Libre_Franklin({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={libre_Franklin.className}>
        {children}
      </body>
    </html>
  );
}
