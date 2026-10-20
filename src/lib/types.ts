export type Row = Record<string, string>;

export interface Column {
  key: string;
  label: string;
  width: string;
  bold?: boolean;
  muted?: boolean;
  badge?: boolean;
  /** Render a file thumbnail (image preview or type icon) before the value. */
  thumb?: boolean;
  /** Render the row's `cover` image as a small thumbnail before the value. */
  cover?: boolean;
  /** 'date' shows a YYYY-MM-DD value as e.g. "Oct 20, 2026". */
  format?: 'date';
}

export interface Field {
  key: string;
  label: string;
  type?: 'text' | 'select' | 'file' | 'date' | 'time' | 'cover' | 'richtext';
  options?: string[];
  placeholder?: string;
}

export interface EntityConfig {
  title: string;
  singular: string;
  columns: Column[];
  fields: Field[];
  blank: Row;
  saveDefaults?: Row;
  /** Date fields prefilled on New, as days from today (0 = today). Evaluated when the form opens. */
  dateDefaults?: Record<string, number>;
  /** New rows get `key` = the highest existing number + 1, keeping the prefix and zero padding (e.g. INV-0021 -> INV-0022). */
  autoNumber?: { key: string };
  /** The "New" button opens a file picker and adds rows directly, skipping the form. */
  uploadOnNew?: boolean;
  /** Add/edit form shows an avatar + name/email card on top, like the profile page. */
  avatarHeader?: boolean;
  /** Per-row button: 'edit' opens the form (default), 'delete' removes the row. */
  rowAction?: 'edit' | 'delete';
  rows: Row[];
}

export interface Stat {
  label: string;
  value: string;
  note: string;
  featured?: boolean;
}

export interface RevenueBar {
  day: string;
  h: number;
  amount: string;
  color: string;
}

export interface TopItem {
  name: string;
  sold: number;
  color: string;
}

export interface Spender {
  name: string;
  initials: string;
  orders: number;
  amount: string;
  color: string;
}
