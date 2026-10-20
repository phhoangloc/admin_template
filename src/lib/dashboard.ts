import { orders, invoices } from './data';
import { fmtMoney, parseMoney } from './money';
import type { RevenueBar, Row, Spender, Stat, TopItem } from './types';

/**
 * Dashboard figures derived from the order and invoice seed data.
 * "Today" is the newest order date in the data, so the page is deterministic (no Date.now()).
 */

const DAY = 86400000;
const toMs = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const daysAgo = (iso: string) => Math.round((toMs(TODAY) - toMs(iso)) / DAY);

export const TODAY = orders.reduce((max, o) => (o.date > max ? o.date : max), '0000-00-00');

const total = (rows: Row[], key = 'total') => rows.reduce((sum, r) => sum + parseMoney(r[key]), 0);
const completed = orders.filter((o) => o.status === 'Completed');
const live = orders.filter((o) => o.status !== 'Cancelled'); // counts toward spend and sales
const inWindow = (rows: Row[], from: number, to: number) =>
  rows.filter((r) => daysAgo(r.date) >= from && daysAgo(r.date) <= to);

const fmtDay = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(toMs(iso)).toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });

// ---- hero: revenue this week vs the week before ----
const thisWeek = inWindow(completed, 0, 6);
const lastWeek = inWindow(completed, 7, 13);
const weekRevenue = total(thisWeek);
const prevRevenue = total(lastWeek);

const byDay = Array.from({ length: 7 }, (_, i) => {
  const iso = toIso(toMs(TODAY) - (6 - i) * DAY);
  return { iso, amount: total(completed.filter((o) => o.date === iso)) };
});
const best = byDay.reduce((a, b) => (b.amount > a.amount ? b : a));

export const hero = {
  label: 'Revenue this week',
  value: fmtMoney(weekRevenue),
  delta: prevRevenue > 0 ? Math.round(((weekRevenue - prevRevenue) / prevRevenue) * 100) : null,
  note: `Best day — ${fmtDay(best.iso, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} (${fmtMoney(best.amount)})`,
};

// ---- stat cards ----
const outstanding = invoices.filter((i) => i.status === 'Unpaid' || i.status === 'Overdue');
const overdue = invoices.filter((i) => i.status === 'Overdue');
const pending = orders.filter((o) => o.status === 'Pending');
const today = orders.filter((o) => o.date === TODAY);

export const stats: Stat[] = [
  { label: 'Orders today', value: String(today.length), note: `${today.filter((o) => o.status === 'Pending').length} still pending`, featured: true },
  { label: 'Pending orders', value: String(pending.length), note: `${fmtMoney(total(pending))} waiting` },
  { label: 'Outstanding invoices', value: fmtMoney(total(outstanding, 'amount')), note: `${outstanding.length} invoices` },
  { label: 'Overdue invoices', value: fmtMoney(total(overdue, 'amount')), note: `${overdue.length} invoices past due` },
];

// ---- revenue chart: completed orders per day, last 7 days ----
const maxDay = Math.max(...byDay.map((d) => d.amount), 1);

export const revenueBars: RevenueBar[] = byDay.map((d) => ({
  day: fmtDay(d.iso, { weekday: 'short' }),
  h: Math.max(6, Math.round((d.amount / maxDay) * 115)),
  amount: String(Math.round(d.amount)),
  color: d.amount === maxDay ? 'var(--bar-hi)' : d.amount >= maxDay * 0.4 ? 'var(--bar-mid)' : 'var(--bar-lo)',
}));

// ---- best-selling items this week: parse "Cheese Burger ×2, Iced Americano" ----
const PALETTE = ['oklch(0.6 0.15 250)', 'oklch(0.6 0.12 190)', 'oklch(0.55 0.12 155)', 'oklch(0.7 0.15 80)', 'oklch(0.6 0.15 300)'];

function countItems(rows: Row[]) {
  const counts = new Map<string, number>();
  for (const o of rows) {
    for (const part of o.items.split(',')) {
      const m = part.trim().match(/^(.*?)(?:\s*×\s*(\d+))?$/);
      if (!m || !m[1]) continue;
      counts.set(m[1], (counts.get(m[1]) ?? 0) + (m[2] ? parseInt(m[2], 10) : 1));
    }
  }
  return counts;
}

export const topItems: TopItem[] = [...countItems(inWindow(live, 0, 6))]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, sold], i) => ({ name, sold, color: PALETTE[i % PALETTE.length] }));

// ---- top customers ----
const AVATARS = ['oklch(0.62 0.14 25)', 'oklch(0.6 0.1 230)', 'oklch(0.6 0.1 300)', 'oklch(0.6 0.13 155)', 'oklch(0.7 0.1 40)'];
const initialsOf = (name: string) => name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const colorOf = (name: string) => AVATARS[[...name].reduce((h, c) => h + c.charCodeAt(0), 0) % AVATARS.length];

function topCustomers(rows: Row[]): Spender[] {
  const by = new Map<string, { orders: number; amount: number }>();
  for (const o of rows) {
    const cur = by.get(o.customer) ?? { orders: 0, amount: 0 };
    by.set(o.customer, { orders: cur.orders + 1, amount: cur.amount + parseMoney(o.total) });
  }
  return [...by]
    .sort((a, b) => b[1].amount - a[1].amount)
    .slice(0, 5)
    .map(([name, v]) => ({ name, initials: initialsOf(name), orders: v.orders, amount: fmtMoney(v.amount), color: colorOf(name) }));
}

export const topWeek = topCustomers(inWindow(live, 0, 6));
export const topMonth = topCustomers(live.filter((o) => o.date.slice(0, 7) === TODAY.slice(0, 7)));
export const monthLabel = fmtDay(TODAY, { month: 'long' });

// ---- lists ----
export const recentOrders = orders.slice(0, 5);

export const invoicesToCollect = [...outstanding].sort((a, b) => a.due.localeCompare(b.due)).slice(0, 5);

export const fmtDate = (iso: string) => fmtDay(iso, { month: 'short', day: 'numeric' });
