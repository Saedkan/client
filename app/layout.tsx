import './globals.css';
import Providers from './providers';
import  { Navbar } from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="p-6 max-w-6xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
