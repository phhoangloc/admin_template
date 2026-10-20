import type { RevenueBar } from '@/lib/types';

interface Props {
  title: string;
  total: string;
  bars: RevenueBar[];
}

export default function RevenueChart({ title, total, bars }: Props) {
  return (
    <div className="card">
      <div className="chart-head">
        <div className="card-title">{title}</div>
        <div className="chart-total">{total}</div>
      </div>
      <div className="bars">
        {bars.map((d) => (
          <div className="bar-col" key={d.day}>
            <div className="bar-amount">${d.amount}</div>
            <div className="bar" style={{ height: d.h, background: d.color }} />
            <div className="bar-day">{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
