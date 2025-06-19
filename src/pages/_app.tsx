import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { listenForAuthChanges } from '../lib/firebase/auth';
import '../styles/global.css';

// Add this import for Google Fonts (Roboto example):
import { Roboto } from 'next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenForAuthChanges((user) => {
      if (user) {
        // User is logged in
        if (router.pathname === '/login') {
          router.push('/');
        }
      } else {
        // User is not logged in
        if (router.pathname !== '/login') {
          router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Apply the Google Font globally
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
