import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

export const metadata = { title: 'Calli Fitness' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Navbar />
          <main className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}