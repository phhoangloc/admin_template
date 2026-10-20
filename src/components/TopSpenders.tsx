import type { Spender } from '@/lib/types';

export default function TopSpenders({ title, users }: { title: string; users: Spender[] }) {
  return (
    <div>
      <div className="card-title" style={{ marginBottom: 14 }}>{title}</div>
      <div className="list">
        {users.map((u, i) => (
          <div className="spender" key={u.name}>
            <div className="rank">{i + 1}</div>
            <div className="avatar" style={{ background: u.color }}>{u.initials}</div>
            <div className="spender-info">
              <div className="spender-name">{u.name}</div>
              <div className="spender-sub">{u.orders} {u.orders === 1 ? 'order' : 'orders'}</div>
            </div>
            <div className="spender-amount">{u.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
