import type { TopItem } from '@/lib/types';

export default function BestSelling({ title, items }: { title: string; items: TopItem[] }) {
  return (
    <div className="card list">
      <div className="card-title">{title}</div>
      {items.map((it, i) => (
        <div className="row" key={it.name}>
          <div className="rank" style={{ width: 16 }}>{i + 1}</div>
          <div className="dot" style={{ background: it.color }} />
          <div className="ellipsis">{it.name}</div>
          <div className="sold">{it.sold} sold</div>
        </div>
      ))}
    </div>
  );
}
