'use client';

import { useEffect, useState } from 'react';
import Avatar from '@/components/Avatar';
import Modal from '@/components/Modal';
import { COLUMNS, PEOPLE, TAGS, seedBoard, type Board, type ColId, type Task } from '@/lib/kanban';

interface Editing {
  task: Task;
  col: ColId;
  isNew: boolean;
}

const fmtDue = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function KanbanPage() {
  const [board, setBoard] = useState<Board>(seedBoard);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<ColId | null>(null);
  const [today, setToday] = useState(''); // set after mount so SSR output doesn't depend on the date

  useEffect(() => {
    const n = new Date();
    setToday(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`);
  }, []);

  /** Move a task to `toCol`, before `beforeId` if given, otherwise to the end. */
  const move = (taskId: string, toCol: ColId, beforeId?: string) =>
    setBoard((b) => {
      const task = Object.values(b).flat().find((t) => t.id === taskId);
      if (!task || beforeId === taskId) return b;
      const next = Object.fromEntries(COLUMNS.map((c) => [c.id, b[c.id].filter((t) => t.id !== taskId)])) as Board;
      const at = beforeId ? next[toCol].findIndex((t) => t.id === beforeId) : -1;
      if (at >= 0) next[toCol].splice(at, 0, task);
      else next[toCol].push(task);
      return next;
    });

  const endDrag = () => { setDragId(null); setOverCol(null); };

  const openNew = (col: ColId) =>
    setEditing({ col, isNew: true, task: { id: 't' + Date.now(), title: '', desc: '', tag: 'dev', assignee: 'sarah', due: '' } });
  const openEdit = (task: Task, col: ColId) => setEditing({ task: { ...task }, col, isNew: false });

  const save = () => {
    if (!editing || !editing.task.title.trim()) return;
    const { task, col, isNew } = editing;
    const clean = { ...task, title: task.title.trim() };
    setBoard((b) => {
      const currentCol = COLUMNS.find((c) => b[c.id].some((t) => t.id === task.id))?.id;
      if (isNew) return { ...b, [col]: [...b[col], clean] };
      if (currentCol === col) return { ...b, [col]: b[col].map((t) => (t.id === task.id ? clean : t)) };
      // status changed in the form: take it out of the old column, append to the new one
      const next = Object.fromEntries(COLUMNS.map((c) => [c.id, b[c.id].filter((t) => t.id !== task.id)])) as Board;
      next[col].push(clean);
      return next;
    });
    setEditing(null);
  };

  const remove = () => {
    if (!editing) return;
    const id = editing.task.id;
    setBoard((b) => Object.fromEntries(COLUMNS.map((c) => [c.id, b[c.id].filter((t) => t.id !== id)])) as Board);
    setEditing(null);
  };

  const patchTask = (change: Partial<Task>) => setEditing((e) => e && { ...e, task: { ...e.task, ...change } });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Kanban</h1>
        <button className="btn btn-primary" onClick={() => openNew('todo')}>+ New task</button>
      </div>

      <div className="kb-board">
        {COLUMNS.map((col) => (
          <section
            key={col.id}
            className={'kb-col' + (overCol === col.id && dragId ? ' over' : '')}
            onDragOver={(e) => { if (dragId) { e.preventDefault(); setOverCol(col.id); } }}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverCol(null); }}
            onDrop={(e) => { e.preventDefault(); if (dragId) move(dragId, col.id); endDrag(); }}
          >
            <header className="kb-col-head">
              <b>{col.title}</b>
              <span className="kb-count">{board[col.id].length}</span>
            </header>

            <div className="kb-list">
              {board[col.id].map((t) => {
                const person = PEOPLE[t.assignee];
                const tag = TAGS[t.tag];
                const overdue = !!t.due && !!today && t.due < today && col.id !== 'done';
                return (
                  <div
                    key={t.id}
                    className={'kb-card' + (dragId === t.id ? ' dragging' : '')}
                    role="button"
                    tabIndex={0}
                    draggable
                    onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', t.id); setDragId(t.id); }}
                    onDragEnd={endDrag}
                    // dropping on a card inserts before it
                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); if (dragId) move(dragId, col.id, t.id); endDrag(); }}
                    onClick={() => openEdit(t, col.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter') openEdit(t, col.id); }}
                  >
                    {tag && <span className="tag" style={{ '--h': tag.hue } as React.CSSProperties}>{tag.label}</span>}
                    <div className="kb-title">{t.title}</div>
                    {t.desc && <div className="kb-desc">{t.desc}</div>}
                    <div className="kb-foot">
                      <span className={'kb-due' + (overdue ? ' overdue' : '')}>{t.due ? fmtDue(t.due) : 'No date'}</span>
                      {person && <span title={person.name}><Avatar initials={person.initials} color={person.color} /></span>}
                    </div>
                  </div>
                );
              })}
              {board[col.id].length === 0 && <div className="kb-empty">Drop tasks here</div>}
            </div>

            <button className="kb-add" onClick={() => openNew(col.id)}>+ Add card</button>
          </section>
        ))}
      </div>

      {editing && (
        <Modal title={editing.isNew ? 'New task' : 'Edit task'} onClose={() => setEditing(null)}>
          <form className="modal-form" onSubmit={(e) => { e.preventDefault(); save(); }}>
            <label className="field">
              Title
              <input autoFocus value={editing.task.title} onChange={(e) => patchTask({ title: e.target.value })} />
            </label>
            <label className="field">
              Description
              <textarea rows={3} value={editing.task.desc} onChange={(e) => patchTask({ desc: e.target.value })} />
            </label>
            <div className="modal-grid">
              <label className="field">
                Status
                <select value={editing.col} onChange={(e) => setEditing({ ...editing, col: e.target.value as ColId })}>
                  {COLUMNS.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </label>
              <label className="field">
                Tag
                <select value={editing.task.tag} onChange={(e) => patchTask({ tag: e.target.value })}>
                  {Object.entries(TAGS).map(([k, t]) => <option key={k} value={k}>{t.label}</option>)}
                </select>
              </label>
              <label className="field">
                Assignee
                <select value={editing.task.assignee} onChange={(e) => patchTask({ assignee: e.target.value })}>
                  {Object.entries(PEOPLE).map(([k, p]) => <option key={k} value={k}>{p.name}</option>)}
                </select>
              </label>
              <label className="field">
                Due date
                <input type="date" value={editing.task.due} onChange={(e) => patchTask({ due: e.target.value })} />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={!editing.task.title.trim()}>Save</button>
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              {!editing.isNew && <button type="button" className="btn btn-ghost btn-danger" onClick={remove}>Delete</button>}
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
