import Link from 'next/link';
import StatCard from '@/components/StatCard';
import RevenueChart from '@/components/RevenueChart';
import BestSelling from '@/components/BestSelling';
import TopSpenders from '@/components/TopSpenders';
import MusicPlayer from '@/components/MusicPlayer';
import { Badge } from '@/components/DataTable';
import {
  fmtDate, hero, invoicesToCollect, monthLabel, recentOrders, revenueBars, stats, topItems, topMonth, topWeek,
} from '@/lib/dashboard';

export default function DashboardPage() {
  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      <div className="hero">
        <div>
          <div className="hero-label">{hero.label}</div>
          <div className="hero-value">{hero.value}</div>
        </div>
        <div>
          {hero.delta !== null && (
            <div className="hero-delta" style={hero.delta < 0 ? { color: 'oklch(0.72 0.15 25)' } : undefined}>
              {hero.delta >= 0 ? '+' : ''}{hero.delta}% vs last week
            </div>
          )}
          <div className="hero-note">{hero.note}</div>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="two-col">
        <RevenueChart
          title="Completed orders — last 7 days"
          total={hero.value} // same 7-day window as the hero; summing the rounded bar labels would drift
          bars={revenueBars}
        />
        <BestSelling title="Best-selling this week" items={topItems} />
      </div>

      <div className="two-col even">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Recent orders</div>
            <Link href="/order" className="card-link">View all</Link>
          </div>
          <div className="list">
            {recentOrders.map((o) => (
              <div className="mini-row" key={o.id}>
                <div className="mini-main">
                  <div className="mini-title">{o.customer}</div>
                  <div className="mini-sub">{o.id} · {o.items}</div>
                </div>
                <Badge status={o.status} />
                <div className="mini-amount">{o.total}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Invoices to collect</div>
            <Link href="/invoice" className="card-link">View all</Link>
          </div>
          <div className="list">
            {invoicesToCollect.map((i) => (
              <div className="mini-row" key={i.id}>
                <div className="mini-main">
                  <div className="mini-title">{i.customer}</div>
                  <div className="mini-sub">{i.id} · due {fmtDate(i.due)}</div>
                </div>
                <Badge status={i.status} />
                <div className="mini-amount">{i.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card spenders">
        <TopSpenders title="Top customers — this week" users={topWeek} />
        <TopSpenders title={`Top customers — ${monthLabel}`} users={topMonth} />
      </div>

      <MusicPlayer />
    </div>
  );
}
