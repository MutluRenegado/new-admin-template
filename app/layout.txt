import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <html lang="en">
      <body>
        <nav className="sidebar">
          <h2>ADMIN</h2>
          <ul>
            <li>
              <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
            </li>
            <li>
              <Link href="/hashtag" className={pathname === '/hashtag' ? 'active' : ''}>Hashtag Generator</Link>
            </li>
            <li>
              <Link href="/summarize" className={pathname === '/summarize' ? 'active' : ''}>Summarizer</Link>
            </li>
            <li>
              <Link href="/settings" className={pathname === '/settings' ? 'active' : ''}>Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="main">
          <div className="header">
            <h1 id="page-title">Blog App Admin</h1>
          </div>
          <section id="app-content">
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
