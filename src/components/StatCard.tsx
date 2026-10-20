import { ArrowUpRight } from './Icons';
import type { Stat } from '@/lib/types';

export default function StatCard({ label, value, note, featured }: Stat) {
  return (
    <div className={'stat' + (featured ? ' featured' : '')}>
      <div className="stat-head">
        <span>{label}</span>
        <span className="stat-icon"><ArrowUpRight /></span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}
