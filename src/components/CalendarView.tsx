'use client';

import { useEffect, useState } from 'react';
import EntityForm from './EntityForm';
import type { EntityConfig, Row } from '@/lib/types';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_CHIPS = 3;

const pad = (n: number) => String(n).padStart(2, '0');
const dateKey = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function formatTime(t: string) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
}

interface Editing {
  index: number | null; // null = creating a new event
  values: Row;
}

/** Month grid of events with month/year selection and add/edit/delete. */
export default function CalendarView({ config }: { config: EntityConfig }) {
  const [events, setEvents] = useState<Row[]>(config.rows);
  const [editing, setEditing] = useState<Editing | null>(null);
  // Set after mount so the server-rendered HTML doesn't depend on the build date.
  const [cursor, setCursor] = useState<{ year: number; month: number } | null>(null);
  const [today, setToday] = useState('');

  useEffect(() => {
    const now = new Date();
    setCursor({ year: now.getFullYear(), month: now.getMonth() });
    setToday(dateKey(now.getFullYear(), now.getMonth(), now.getDate()));
  }, []);

  const openNew = (date = today) => setEditing({ index: null, values: { ...config.blank, date } });
  const openEdit = (i: number) => setEditing({ index: i, values: { ...events[i] } });
  const setField = (key: string, value: string) =>
    setEditing((e) => e && { ...e, values: { ...e.values, [key]: value } });
  const save = () => {
    if (!editing) return;
    const row = { ...config.blank, ...editing.values };
    setEvents((r) => (editing.index === null ? [...r, row] : r.map((x, i) => (i === editing.index ? row : x))));
    setEditing(null);
  };
  const remove = () => {
    if (editing?.index != null) setEvents((r) => r.filter((_, i) => i !== editing.index));
    setEditing(null);
  };

  if (editing) {
    return (
      <EntityForm
        title={(editing.index === null ? 'New ' : 'Edit ') + config.singular}
        fields={config.fields}
        values={editing.values}
        onChange={setField}
        onSave={save}
        onCancel={() => setEditing(null)}
        onDelete={editing.index === null ? undefined : remove}
      />
    );
  }

  if (!cursor) return <div className="page"><h1 className="page-title">Calendar</h1></div>;

  const { year, month } = cursor;
  const go = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
  };

  // Leading/trailing days from adjacent months fill out whole weeks.
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const cells = Array.from({ length: cellCount }, (_, i) => {
    const d = new Date(year, month, i - firstWeekday + 1);
    return { day: d.getDate(), inMonth: d.getMonth() === month, key: dateKey(d.getFullYear(), d.getMonth(), d.getDate()) };
  });

  const byDate = new Map<string, number[]>();
  events.forEach((e, i) => byDate.set(e.date, [...(byDate.get(e.date) ?? []), i]));
  byDate.forEach((list) => list.sort((a, b) => events[a].time.localeCompare(events[b].time)));

  const years = Array.from({ length: 21 }, (_, i) => year - 10 + i);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
        <button className="btn btn-primary" onClick={() => openNew()}>+ New {config.singular}</button>
      </div>

      <div className="cal-toolbar">
        <div className="cal-nav">
          <button className="page-btn" onClick={() => go(-1)} aria-label="Previous month">‹</button>
          <select
            className="cal-select"
            value={month}
            onChange={(e) => setCursor({ year, month: Number(e.target.value) })}
            aria-label="Month"
          >
            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <select
            className="cal-select"
            value={year}
            onChange={(e) => setCursor({ year: Number(e.target.value), month })}
            aria-label="Year"
          >
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <button className="page-btn" onClick={() => go(1)} aria-label="Next month">›</button>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            const now = new Date();
            setCursor({ year: now.getFullYear(), month: now.getMonth() });
          }}
        >
          Today
        </button>
      </div>

      <div className="cal-card">
        <div className="cal-grid cal-dow">
          {WEEKDAYS.map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="cal-grid">
          {cells.map((c) => {
            const list = byDate.get(c.key) ?? [];
            return (
              <div
                key={c.key}
                className={'cal-cell' + (c.inMonth ? '' : ' out') + (c.key === today ? ' today' : '')}
                onClick={() => openNew(c.key)}
              >
                <span className="cal-day">{c.day}</span>
                {list.slice(0, MAX_CHIPS).map((i) => (
                  <button
                    key={i}
                    className="cal-chip"
                    onClick={(e) => { e.stopPropagation(); openEdit(i); }}
                    title={`${formatTime(events[i].time)} ${events[i].title}`}
                  >
                    <b>{formatTime(events[i].time)}</b> {events[i].title}
                  </button>
                ))}
                {list.length > MAX_CHIPS && <span className="cal-more">+{list.length - MAX_CHIPS} more</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
