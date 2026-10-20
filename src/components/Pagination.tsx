interface Props {
  page: number; // 1-based
  pageCount: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

/** Page numbers to show: first, last, and a window around the current page. */
function pageList(page: number, count: number): (number | '…')[] {
  const keep = new Set([1, count, page - 1, page, page + 1]);
  const nums = [...keep].filter((n) => n >= 1 && n <= count).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}

export default function Pagination({ page, pageCount, total, pageSize, onChange }: Props) {
  if (total === 0) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="pagination">
      <div className="page-info">Showing {from}–{to} of {total}</div>
      <div className="page-btns">
        <button className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">‹</button>
        {pageList(page, pageCount).map((p, i) =>
          p === '…' ? (
            <span key={'gap' + i} className="page-gap">…</span>
          ) : (
            <button
              key={p}
              className={'page-btn' + (p === page ? ' active' : '')}
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button className="page-btn" disabled={page === pageCount} onClick={() => onChange(page + 1)} aria-label="Next page">›</button>
      </div>
    </div>
  );
}
