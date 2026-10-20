'use client';

import { useState } from 'react';
import DataTable from './DataTable';
import EntityForm from './EntityForm';
import Pagination from './Pagination';
import AvatarPicker from './AvatarPicker';
import { initials } from '@/lib/profile';
import type { EntityConfig, Row } from '@/lib/types';

const PAGE_SIZE = 20;

interface Editing {
  index: number | null; // null = creating a new row
  values: Row;
}

export interface SummaryItem {
  label: string;
  value: string;
  note?: string;
}

interface Props {
  config: EntityConfig;
  /** Cards shown above the table, recomputed from the current rows. Pass from a client component. */
  summary?: (rows: Row[]) => SummaryItem[];
}

/** Archive table + add/edit form for one entity. */
export default function CrudPage({ config, summary }: Props) {
  const [rows, setRows] = useState<Row[]>(config.rows);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [page, setPage] = useState(1);

  // Clamp so deleting the last row of the last page lands on the previous page.
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const offset = (currentPage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(offset, offset + PAGE_SIZE);

  const openNew = () => {
    const dates = Object.fromEntries(
      Object.entries(config.dateDefaults ?? {}).map(([k, days]) => [k, new Date(Date.now() + days * 86400000).toISOString().slice(0, 10)]),
    );
    setEditing({ index: null, values: { ...config.blank, ...dates } });
  };

  // Next id for auto-numbered entities: highest trailing number + 1, same prefix and padding.
  const nextNumber = (key: string) => {
    const ids = rows.map((r) => r[key] ?? '');
    const nums = ids.map((id) => parseInt(id.match(/(\d+)$/)?.[1] ?? '0', 10));
    const sample = ids[0] ?? '';
    const prefix = sample.replace(/\d+$/, '');
    const width = sample.match(/(\d+)$/)?.[1].length ?? 1;
    return prefix + String(Math.max(0, ...nums) + 1).padStart(width, '0');
  };
  const openEdit = (i: number) => setEditing({ index: i, values: { ...rows[i] } });
  const deleteRow = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));
  const setField = (key: string, value: string) =>
    setEditing((e) => e && { ...e, values: { ...e.values, [key]: value } });

  // Name/type/size (and an image preview) derived from a picked file.
  const fromFile = (file: File): Row => {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    const type = file.type.startsWith('image/') ? 'Image'
      : ext === 'pdf' ? 'PDF'
        : ['xls', 'xlsx', 'csv'].includes(ext) ? 'Excel'
          : ['doc', 'docx'].includes(ext) ? 'Word'
            : 'File';
    const size = file.size >= 1024 * 1024
      ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
      : Math.max(1, Math.round(file.size / 1024)) + ' KB';
    return { name: file.name, size, type, preview: type === 'Image' ? URL.createObjectURL(file) : '' };
  };

  const pickFile = (file: File) =>
    setEditing((e) => e && { ...e, values: { ...e.values, ...fromFile(file) } });

  // "New" uploads straight away, without opening the form.
  const uploadNew = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).map((f) => ({ ...config.blank, ...config.saveDefaults, ...fromFile(f) }));
    setRows((r) => [...r, ...added]);
  };

  const save = () => {
    if (!editing) return;
    const row = { ...config.blank, ...config.saveDefaults, ...editing.values };
    const key = config.autoNumber?.key;
    if (key && editing.index === null) row[key] = nextNumber(key);
    setRows((r) => {
      if (editing.index !== null) return r.map((x, i) => (i === editing.index ? row : x));
      return key ? [row, ...r] : [...r, row]; // numbered records (orders, invoices) list newest first
    });
    setEditing(null);
  };

  if (editing) {
    return (
      <EntityForm
        title={(editing.index === null ? 'New ' : 'Edit ') + config.singular}
        fields={config.fields}
        values={editing.values}
        onChange={setField}
        header={config.avatarHeader && (
          <div className="card profile-card">
            <AvatarPicker
              src={editing.values.avatar}
              initials={initials(editing.values.name ?? '')}
              onChange={(avatar) => setField('avatar', avatar)}
            />
            <div>
              <h2>{editing.values.name || 'New user'}</h2>
              <p>{editing.values.email || '—'}</p>
            </div>
          </div>
        )}
        onFile={pickFile}
        onSave={save}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{config.title}</h1>
        {config.uploadOnNew ? (
          <label className="btn btn-primary">
            + New {config.singular}
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => { uploadNew(e.target.files); e.target.value = ''; }}
            />
          </label>
        ) : (
          <button className="btn btn-primary" onClick={openNew}>+ New {config.singular}</button>
        )}
      </div>
      {summary && (
        <div className="sum-grid">
          {summary(rows).map((s) => (
            <div className="card sum-card" key={s.label}>
              <div className="sum-label">{s.label}</div>
              <div className="sum-value">{s.value}</div>
              {s.note && <div className="sum-note">{s.note}</div>}
            </div>
          ))}
        </div>
      )}
      <DataTable
        columns={config.columns}
        rows={pageRows}
        action={config.rowAction ?? 'edit'}
        // DataTable reports the index within the visible page; map it back to `rows`.
        onAction={(i) => (config.rowAction === 'delete' ? deleteRow : openEdit)(offset + i)}
      />
      <Pagination page={currentPage} pageCount={pageCount} total={rows.length} pageSize={PAGE_SIZE} onChange={setPage} />
    </div>
  );
}
