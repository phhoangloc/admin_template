import FileThumb from './FileThumb';
import type { Column, Row } from '@/lib/types';

const BADGE: Record<string, string> = {
  Active: 'ok', Completed: 'ok', Paid: 'ok',
  Draft: 'warn', 'In Progress': 'warn', Pending: 'warn', Unpaid: 'warn',
  Overdue: 'bad', Cancelled: 'bad',
};

/** "2026-10-20" -> "Oct 20, 2026"; anything else is shown as-is. */
const fmtDate = (iso: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(iso)
    ? new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : iso ?? '';

export function Badge({ status }: { status: string }) {
  return <span className={'badge ' + (BADGE[status] ?? '')}>{status}</span>;
}

interface Props {
  columns: Column[];
  rows: Row[];
  action: 'edit' | 'delete';
  onAction: (index: number) => void;
}

/** The last (unlabeled) column holds the row action button. */
export default function DataTable({ columns, rows, action, onAction }: Props) {
  const grid = { gridTemplateColumns: [...columns.map((c) => c.width), '0.6fr'].join(' ') };
  return (
    <div className="table-card">
      <div className="tr head" style={grid}>
        {columns.map((c) => <div key={c.key}>{c.label.toUpperCase()}</div>)}
        <div />
      </div>
      {rows.map((row, i) => (
        <div className="tr" style={grid} key={i}>
          {columns.map((c) => (
            <div key={c.key} className={c.bold ? 'strong' : c.muted ? 'muted' : ''}>
              {c.cover ? (
                <span className="thumb-cell">
                  {row.cover
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img className="thumb" src={row.cover} alt="" />
                    : <span className="thumb" />}
                  {row[c.key]}
                </span>
              ) : c.thumb ? (
                <span className="thumb-cell"><FileThumb row={row} />{row[c.key]}</span>
              ) : c.badge ? <Badge status={row[c.key]} /> : c.format === 'date' ? fmtDate(row[c.key]) : row[c.key]}
            </div>
          ))}
          <div>
            <button
              className={'btn btn-ghost btn-sm' + (action === 'delete' ? ' btn-danger' : '')}
              onClick={() => onAction(i)}
            >
              {action === 'delete' ? 'Delete' : 'Edit'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
