'use client';

import { useEffect, useRef } from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

const TOOLS: { label: string; title: string; cmd: string; arg?: string; style?: React.CSSProperties }[] = [
  { label: 'B', title: 'Bold', cmd: 'bold', style: { fontWeight: 800 } },
  { label: 'I', title: 'Italic', cmd: 'italic', style: { fontStyle: 'italic' } },
  { label: 'U', title: 'Underline', cmd: 'underline', style: { textDecoration: 'underline' } },
  { label: 'H', title: 'Heading', cmd: 'formatBlock', arg: 'h3' },
  { label: '¶', title: 'Paragraph', cmd: 'formatBlock', arg: 'p' },
  { label: '•', title: 'Bullet list', cmd: 'insertUnorderedList' },
  { label: '1.', title: 'Numbered list', cmd: 'insertOrderedList' },
  { label: '❝', title: 'Quote', cmd: 'formatBlock', arg: 'blockquote' },
];

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

/** Small contentEditable-based rich text box. Uncontrolled after mount to keep the caret stable. */
export default function RichTextEditor({ value, onChange, placeholder = 'Write the details here…' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = sanitizeHtml(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = () => onChange(ref.current?.innerHTML ?? '');
  const run = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    emit();
  };
  const addLink = () => {
    const url = window.prompt('Link URL (https://…)');
    if (url && /^(https?:\/\/|mailto:)/i.test(url.trim())) run('createLink', url.trim());
  };

  return (
    <div className="rte">
      <div className="rte-toolbar">
        {TOOLS.map((t) => (
          <button
            key={t.title}
            type="button"
            className="rte-btn"
            title={t.title}
            style={t.style}
            onMouseDown={(e) => e.preventDefault()} // keep the text selection
            onClick={() => run(t.cmd, t.arg)}
          >
            {t.label}
          </button>
        ))}
        <button type="button" className="rte-btn" title="Link" onMouseDown={(e) => e.preventDefault()} onClick={addLink}>🔗</button>
        <button type="button" className="rte-btn" title="Clear formatting" onMouseDown={(e) => e.preventDefault()} onClick={() => run('removeFormat')}>Tx</button>
      </div>
      <div
        ref={ref}
        className="rte-body"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onPaste={(e) => {
          // Plain text only: pasted HTML can carry styles or handlers.
          e.preventDefault();
          document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
        }}
      />
    </div>
  );
}
