/** "$2,480.00" -> 2480 (anything unparseable counts as 0). */
export const parseMoney = (s: string | undefined) => parseFloat((s ?? '').replace(/[^0-9.]/g, '')) || 0;

export const fmtMoney = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

export const sumBy = (rows: { total?: string; amount?: string; [k: string]: string | undefined }[], key: string) =>
  rows.reduce((acc, r) => acc + parseMoney(r[key]), 0);
