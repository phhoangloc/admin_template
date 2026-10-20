import type { Metadata } from 'next';
import { Manrope, Inter, DM_Sans, Lora, JetBrains_Mono } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { ProfileProvider } from '@/lib/profile';
import { MailProvider } from '@/lib/mail';
import { PlayerProvider } from '@/lib/player';
import MiniPlayer from '@/components/MiniPlayer';
import { SettingsProvider, NO_FLASH_SCRIPT } from '@/lib/settings';
import './globals.css';

const manrope = Manrope({ subsets: ['latin', 'vietnamese'], variable: '--font-manrope' });
const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const lora = Lora({ subsets: ['latin', 'vietnamese'], variable: '--font-lora' });
const mono = JetBrains_Mono({ subsets: ['latin', 'vietnamese'], variable: '--font-mono' });

export const metadata: Metadata = { title: 'Admin' };

const fontVars = [manrope, inter, dmSans, lora, mono].map((f) => f.variable).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script sets data-theme/data-font/--hue before hydration, hence suppressHydrationWarning.
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <SettingsProvider>
          <ProfileProvider>
            <MailProvider>
              <PlayerProvider>
                <div className="shell">
                  <Sidebar />
                  <main className="main">
                    <Topbar />
                    {children}
                  </main>
                </div>
                <MiniPlayer />
              </PlayerProvider>
            </MailProvider>
          </ProfileProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
