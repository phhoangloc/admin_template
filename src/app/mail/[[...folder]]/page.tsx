'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { sanitizeHtml } from '@/lib/sanitize';
import { MAIL_FOLDERS, useMail } from '@/lib/mail';
import type { Mail, MailFolder } from '@/lib/data';

const ME = { name: 'Michael Chen', email: 'm.chen@projek.io' };
const timeNow = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

interface Draft {
  to: string;
  subject: string;
  body: string;
  session: number; // remounts the editor for each new compose
}

/** /mail = inbox, /mail/sent, /mail/drafts, /mail/trash. Folder links live in the sidebar. */
export default function MailPage() {
  const params = useParams<{ folder?: string[] }>();
  const slug = params.folder?.[0];
  const folder = MAIL_FOLDERS.find((f) => f.key === slug)?.key ?? 'inbox';
  // keyed by folder so the open message and compose form reset when you switch folders
  return <MailView key={folder} folder={folder} />;
}

function MailView({ folder }: { folder: MailFolder }) {
  const router = useRouter();
  const { mails, setMails } = useMail();
  const [openId, setOpenId] = useState<string | null>(null);
  const [compose, setCompose] = useState<Draft | null>(null);
  const [error, setError] = useState('');

  const title = MAIL_FOLDERS.find((f) => f.key === folder)!.label;
  const list = mails.filter((m) => m.folder === folder);
  const open = mails.find((m) => m.id === openId) ?? null;
  const safeBody = useMemo(() => (open && typeof window !== 'undefined' ? sanitizeHtml(open.body) : ''), [open]);

  const hasContent = compose !== null || open !== null;
  const closeReader = () => { setCompose(null); setOpenId(null); };

  // Esc closes the modal, but only on small screens where the reader is one.
  useEffect(() => {
    if (!hasContent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && window.matchMedia('(max-width: 767px)').matches) {
        setCompose(null);
        setOpenId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasContent]);

  const patch = (id: string, change: Partial<Mail>) =>
    setMails((ms) => ms.map((m) => (m.id === id ? { ...m, ...change } : m)));

  const read = (m: Mail) => { setCompose(null); setOpenId(m.id); if (!m.read) patch(m.id, { read: true }); };
  const newCompose = (to = '', subject = '') => { setError(''); setCompose({ to, subject, body: '', session: Date.now() }); };

  const remove = (m: Mail) => {
    if (m.folder === 'trash') setMails((ms) => ms.filter((x) => x.id !== m.id));
    else patch(m.id, { folder: 'trash' });
    setOpenId(null);
  };

  const finish = (target: 'sent' | 'drafts') => {
    if (!compose) return;
    const to = compose.to.trim();
    if (target === 'sent' && !/^\S+@\S+\.\S+$/.test(to)) { setError('Enter a valid recipient email.'); return; }
    const mail: Mail = {
      id: 'm' + Date.now(), folder: target, name: to || '(no recipient)', email: to,
      subject: compose.subject.trim() || '(no subject)', body: compose.body, time: timeNow(), read: true, starred: false,
    };
    setMails((ms) => [mail, ...ms]);
    setCompose(null);
    router.push(MAIL_FOLDERS.find((f) => f.key === target)!.href);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <button className="btn btn-primary" onClick={() => newCompose()}>+ Compose</button>
      </div>

      <div className="mail">
        <div className="mail-list">
          {list.length === 0 && <div className="mail-empty">Nothing in {title.toLowerCase()}.</div>}
          {list.map((m) => (
            <div key={m.id} className={'mail-row' + (m.id === open?.id ? ' active' : '') + (m.read ? '' : ' unread-row')}>
              <button
                className={'star' + (m.starred ? ' on' : '')}
                aria-label={m.starred ? 'Remove star' : 'Star'}
                onClick={() => patch(m.id, { starred: !m.starred })}
              >
                {m.starred ? '★' : '☆'}
              </button>
              <button className="mail-row-body" onClick={() => read(m)}>
                <span className="chat-item-top"><b>{m.name}</b><span className="chat-time">{m.time}</span></span>
                <span className="mail-subject">{m.subject}</span>
                <span className="chat-preview">{stripHtml(m.body)}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Below 768px the reader is a modal that only exists while a mail or the composer is open (see globals.css). */}
        {hasContent && <div className="mail-backdrop" onClick={closeReader} />}
        <div className={'mail-reader' + (hasContent ? ' modal-open' : '')}>
          {hasContent && <button className="modal-close" aria-label="Close" onClick={closeReader}>✕</button>}
          {compose ? (
            <form className="mail-compose" onSubmit={(e) => { e.preventDefault(); finish('sent'); }}>
              <div className="mail-reader-head"><b>New message</b></div>
              <label className="field">
                To
                <input value={compose.to} onChange={(e) => setCompose({ ...compose, to: e.target.value })} placeholder="name@example.com" />
              </label>
              <label className="field">
                Subject
                <input value={compose.subject} onChange={(e) => setCompose({ ...compose, subject: e.target.value })} />
              </label>
              <div className="field">
                Message
                <RichTextEditor key={compose.session} value={compose.body} onChange={(body) => setCompose((c) => c && { ...c, body })} placeholder="Write your message…" />
              </div>
              {error && <div className="mail-error" role="alert">{error}</div>}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Send</button>
                <button type="button" className="btn btn-ghost" onClick={() => finish('drafts')}>Save draft</button>
                <button type="button" className="btn btn-ghost" onClick={() => setCompose(null)}>Discard</button>
              </div>
            </form>
          ) : open ? (
            <>
              <div className="mail-reader-head">
                <div>
                  <h2>{open.subject}</h2>
                  <div className="mail-meta">
                    {open.folder === 'sent' || open.folder === 'drafts' ? 'To' : 'From'} <b>{open.name}</b> &lt;{open.email}&gt; · {open.time}
                    {open.folder === 'inbox' && <> · to {ME.name}</>}
                  </div>
                </div>
                <div className="mail-actions">
                  {open.folder === 'inbox' && (
                    <button className="btn btn-ghost btn-sm" onClick={() => newCompose(open.email, /^re:/i.test(open.subject) ? open.subject : 'Re: ' + open.subject)}>Reply</button>
                  )}
                  {open.folder === 'inbox' && (
                    <button className="btn btn-ghost btn-sm" onClick={() => { patch(open.id, { read: false }); setOpenId(null); }}>Mark unread</button>
                  )}
                  <button className="btn btn-ghost btn-sm btn-danger" onClick={() => remove(open)}>
                    {open.folder === 'trash' ? 'Delete forever' : 'Delete'}
                  </button>
                </div>
              </div>
              <div className="mail-body rte-body" dangerouslySetInnerHTML={{ __html: safeBody }} />
            </>
          ) : (
            <div className="mail-empty">Select a message to read it.</div>
          )}
        </div>
      </div>
    </div>
  );
}
