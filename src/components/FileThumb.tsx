import type { Row } from '@/lib/types';

const TYPE_STYLE: Record<string, { label: string; bg: string; fg: string }> = {
  PDF: { label: 'PDF', bg: 'oklch(0.94 0.04 25)', fg: 'oklch(0.5 0.16 25)' },
  Excel: { label: 'XLS', bg: 'oklch(0.93 0.05 155)', fg: 'oklch(0.38 0.1 155)' },
  Word: { label: 'DOC', bg: 'oklch(0.93 0.04 250)', fg: 'oklch(0.45 0.14 250)' },
};

/** Image preview for images, a typed file icon for everything else. */
export default function FileThumb({ row }: { row: Row }) {
  if (row.type === 'Image' && row.preview) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="thumb" src={row.preview} alt={row.name} />;
  }
  const s = TYPE_STYLE[row.type] ?? { label: 'FILE', bg: 'var(--chip)', fg: 'var(--muted)' };
  return (
    <span className="thumb file-icon" style={{ background: s.bg, color: s.fg }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M2.5 1.5h6l3 3v9.5a1 1 0 01-1 1h-8a1 1 0 01-1-1v-11.5a1 1 0 011-1z" /><path d="M8.5 1.5v3h3" />
      </svg>
      <span className="file-ext">{s.label}</span>
    </span>
  );
}
