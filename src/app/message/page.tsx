'use client';

import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/Avatar';
import { conversations as seed, type Conversation } from '@/lib/data';

const timeNow = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

export default function MessagePage() {
  const [convos, setConvos] = useState<Conversation[]>(seed);
  const [activeId, setActiveId] = useState(seed[0].id);
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const active = convos.find((c) => c.id === activeId) ?? convos[0];

  // Keep the newest message in view.
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [activeId, active.messages.length]);

  const open = (id: string) => {
    setActiveId(id);
    setConvos((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setConvos((cs) => cs.map((c) =>
      c.id === active.id ? { ...c, messages: [...c.messages, { from: 'me', text, time: timeNow() }] } : c));
    setDraft('');
  };

  return (
    <div className="page">
      <h1 className="page-title">Message</h1>

      <div className="chat">
        <div className="chat-list">
          {convos.map((c) => {
            const last = c.messages[c.messages.length - 1];
            return (
              <button
                key={c.id}
                className={'chat-item' + (c.id === active.id ? ' active' : '')}
                onClick={() => open(c.id)}
              >
                <Avatar initials={c.initials} color={c.color} />
                <span className="chat-item-body">
                  <span className="chat-item-top">
                    <b>{c.name}</b>
                    <span className="chat-time">{last.time}</span>
                  </span>
                  <span className="chat-item-top">
                    <span className="chat-preview">{last.from === 'me' ? 'You: ' : ''}{last.text}</span>
                    {c.unread > 0 && <span className="unread">{c.unread}</span>}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="chat-thread">
          <div className="chat-head">
            <Avatar initials={active.initials} color={active.color} />
            <b>{active.name}</b>
          </div>
          <div className="chat-messages">
            {active.messages.map((m, i) => (
              <div key={i} className={'bubble-row ' + m.from}>
                <div className="bubble">
                  {m.text}
                  <span className="bubble-time">{m.time}</span>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form className="chat-composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${active.name}…`}
              aria-label="Message"
            />
            <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
