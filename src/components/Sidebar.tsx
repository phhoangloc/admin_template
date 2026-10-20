'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIL_FOLDERS, useMail } from '@/lib/mail';
import { DashboardIcon, UserIcon, ItemIcon, OrderIcon, InvoiceIcon, FileIcon, CalendarIcon, KanbanIcon, MessageIcon, MailBoxIcon, SettingsIcon, HelpIcon, LogoutIcon } from './Icons';

const MENU = [
  { href: '/', label: 'Dashboard', Icon: DashboardIcon },
  { href: '/user', label: 'User', Icon: UserIcon },
  { href: '/item', label: 'Item', Icon: ItemIcon },
  { href: '/order', label: 'Order', Icon: OrderIcon },
  { href: '/invoice', label: 'Invoice', Icon: InvoiceIcon },
  { href: '/file', label: 'File', Icon: FileIcon },
  { href: '/calendar', label: 'Calendar', Icon: CalendarIcon },
  { href: '/kanban', label: 'Kanban', Icon: KanbanIcon },
  { href: '/message', label: 'Message', Icon: MessageIcon },
  { href: '/mail', label: 'Mail', Icon: MailBoxIcon },
];

const GENERAL: { label: string; Icon: () => JSX.Element; href?: string }[] = [
  { label: 'Settings', Icon: SettingsIcon, href: '/settings' },
  { label: 'Help', Icon: HelpIcon },
  { label: 'Logout', Icon: LogoutIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { unread } = useMail();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="nav-text">Admin</span>
        <span className="brand-short" aria-hidden>A</span>
      </div>
      <nav className="nav">
        <div className="nav-label">MENU</div>
        {MENU.map(({ href, label, Icon }) => (
          <Fragment key={href}>
            {/* title/aria-label keep the item identifiable when the text is hidden on small screens */}
            <Link href={href} title={label} aria-label={label} className={'nav-item' + (isActive(href) ? ' active' : '')}>
              <Icon /> <span className="nav-text">{label}</span>
            </Link>
            {href === '/mail' && isActive(href) && (
              <div className="nav-sub">
                {MAIL_FOLDERS.map((f) => (
                  <Link key={f.key} href={f.href} className={'nav-sub-item' + (pathname === f.href ? ' active' : '')}>
                    {f.label}
                    {f.key === 'inbox' && unread > 0 && <span className="unread">{unread}</span>}
                  </Link>
                ))}
              </div>
            )}
          </Fragment>
        ))}
        <div className="nav-label spaced">GENERAL</div>
        {GENERAL.map(({ label, Icon, href }) =>
          href ? (
            <Link key={label} href={href} title={label} aria-label={label} className={'nav-item' + (isActive(href) ? ' active' : '')}>
              <Icon /> <span className="nav-text">{label}</span>
            </Link>
          ) : (
            <a key={label} href="#" title={label} aria-label={label} className="nav-item">
              <Icon /> <span className="nav-text">{label}</span>
            </a>
          ),
        )}
      </nav>
    </aside>
  );
}
