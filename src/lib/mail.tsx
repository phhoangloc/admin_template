'use client';

import { createContext, useContext, useState } from 'react';
import { mails as seed, type Mail, type MailFolder } from './data';

export const MAIL_FOLDERS: { key: MailFolder; label: string; href: string }[] = [
  { key: 'inbox', label: 'Inbox', href: '/mail' },
  { key: 'sent', label: 'Sent', href: '/mail/sent' },
  { key: 'drafts', label: 'Drafts', href: '/mail/drafts' },
  { key: 'trash', label: 'Trash', href: '/mail/trash' },
];

interface Ctx {
  mails: Mail[];
  setMails: React.Dispatch<React.SetStateAction<Mail[]>>;
  unread: number;
}

const MailContext = createContext<Ctx | null>(null);

/** Holds the mailbox so the sidebar (folder links, unread badge) and the mail page share it. */
export function MailProvider({ children }: { children: React.ReactNode }) {
  const [mails, setMails] = useState<Mail[]>(seed);
  const unread = mails.filter((m) => m.folder === 'inbox' && !m.read).length;
  return <MailContext.Provider value={{ mails, setMails, unread }}>{children}</MailContext.Provider>;
}

export function useMail() {
  const ctx = useContext(MailContext);
  if (!ctx) throw new Error('useMail must be used inside <MailProvider>');
  return ctx;
}
