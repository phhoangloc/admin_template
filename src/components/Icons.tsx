import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4,
};

export const DashboardIcon = () => (
  <svg {...base} stroke="none" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1.5" /><rect x="9" y="1" width="6" height="6" rx="1.5" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" /><rect x="9" y="9" width="6" height="6" rx="1.5" />
  </svg>
);
export const UserIcon = () => (
  <svg {...base}><circle cx="8" cy="5.5" r="2.5" /><path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" strokeLinecap="round" /></svg>
);
export const ItemIcon = () => (
  <svg {...base}><rect x="1.5" y="1.5" width="13" height="13" rx="2.5" /><path d="M1.5 6h13" /></svg>
);
export const FileIcon = () => (
  <svg {...base}><path d="M2.5 1.5h6l3 3v9.5a1 1 0 01-1 1h-8a1 1 0 01-1-1v-11.5a1 1 0 011-1z" /><path d="M8.5 1.5v3h3" /></svg>
);
export const CalendarIcon = () => (
  <svg {...base}><rect x="1.5" y="2.5" width="13" height="12" rx="2" /><path d="M1.5 6h13M5 1v3M11 1v3" /></svg>
);
export const OrderIcon = () => (
  <svg {...base}><path d="M2.5 5h11l-1 8.5h-9z" strokeLinejoin="round" /><path d="M5.5 5V4a2.5 2.5 0 015 0v1" strokeLinecap="round" /></svg>
);
export const InvoiceIcon = () => (
  <svg {...base}><path d="M3.5 1.5h9v13l-1.8-1.2-1.7 1.2-1.7-1.2-1.7 1.2-2.1-1.2z" strokeLinejoin="round" /><path d="M6 5.5h4M6 8.5h4" strokeLinecap="round" /></svg>
);
export const KanbanIcon = () => (
  <svg {...base}><rect x="1.5" y="2" width="3.6" height="12" rx="1" /><rect x="6.2" y="2" width="3.6" height="7.5" rx="1" /><rect x="10.9" y="2" width="3.6" height="9.5" rx="1" /></svg>
);
export const MessageIcon = () => (
  <svg {...base}><path d="M2 3.5a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0114 3.5v6a1.5 1.5 0 01-1.5 1.5H7l-3 3v-3h-.5A1.5 1.5 0 012 9.5z" strokeLinejoin="round" /></svg>
);
export const MailBoxIcon = () => (
  <svg {...base}><rect x="1.5" y="3" width="13" height="10" rx="2" /><path d="M2 4l6 4.5L14 4" strokeLinecap="round" /></svg>
);
export const SettingsIcon = () => (
  <svg {...base}><circle cx="8" cy="8" r="2.2" /><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M3.3 12.7l1.4-1.4M11.3 4.7l1.4-1.4" /></svg>
);
export const HelpIcon = () => (
  <svg {...base}><circle cx="8" cy="8" r="6.5" /><path d="M6.2 6.3a1.8 1.8 0 113.1 1.5c-.4.5-1.3.9-1.3 2" strokeLinecap="round" /><circle cx="8" cy="11.3" r="0.2" fill="currentColor" /></svg>
);
export const LogoutIcon = () => (
  <svg {...base} strokeLinecap="round"><path d="M6 1.5H3a1 1 0 00-1 1v11a1 1 0 001 1h3M10.5 11l3-3-3-3M13 8H5.5" /></svg>
);
export const SearchIcon = () => (
  <svg {...base} strokeWidth="1.5" style={{ color: 'var(--faint)' }}><circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" strokeLinecap="round" /></svg>
);
export const MailIcon = () => (
  <svg {...base} width="17" height="17"><rect x="1.5" y="3" width="13" height="10" rx="2" /><path d="M2 4l6 4.5L14 4" strokeLinecap="round" /></svg>
);
export const BellIcon = () => (
  <svg {...base} width="17" height="17"><path d="M8 1.5c-2 0-3.2 1.6-3.2 3.6v2.4c0 .8-.3 1.5-.9 2.2l-.6.7h9.4l-.6-.7c-.6-.7-.9-1.4-.9-2.2V5.1c0-2-1.2-3.6-3.2-3.6z" /><path d="M6.3 12.5a1.7 1.7 0 003.4 0" /></svg>
);
export const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 9L9 3M4 3h5v5" /></svg>
);
