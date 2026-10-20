import CoverPicker from './CoverPicker';
import RichTextEditor from './RichTextEditor';
import type { Field, Row } from '@/lib/types';

interface Props {
  title: string;
  fields: Field[];
  values: Row;
  onChange: (key: string, value: string) => void;
  onFile?: (file: File) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
  /** Rendered between the title and the form (e.g. an avatar card). Also widens the form. */
  header?: React.ReactNode;
}

export default function EntityForm({ title, fields, values, onChange, onFile, onSave, onCancel, onDelete, header }: Props) {
  // Cover/rich-text forms get a wide two-column layout; the plain ones stay narrow.
  const rich = fields.some((f) => f.type === 'cover' || f.type === 'richtext');
  return (
    <div className={'page' + (header || rich ? '' : ' form-wrap')}>
      <h1 className="page-title">{title}</h1>
      {header}
      <form className={'form-card' + (rich ? ' cols-2' : '')} onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        {fields.map((f) => f.type === 'cover' || f.type === 'richtext' ? (
          // Not a <label>: clicking it would forward to the first button/editable inside.
          <div className="field full" key={f.key}>
            {f.label}
            {f.type === 'cover' ? (
              <CoverPicker src={values[f.key]} onChange={(url) => onChange(f.key, url)} />
            ) : (
              <RichTextEditor value={values[f.key] ?? ''} onChange={(html) => onChange(f.key, html)} placeholder={f.placeholder} />
            )}
          </div>
        ) : (
          <label className="field" key={f.key}>
            {f.label}
            {f.type === 'file' ? (
              <>
                {values.type === 'Image' && values.preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="preview" src={values.preview} alt="Preview" />
                )}
                <input type="file" onChange={(e) => e.target.files?.[0] && onFile?.(e.target.files[0])} />
              </>
            ) : f.type === 'select' ? (
              <select value={values[f.key] ?? ''} onChange={(e) => onChange(f.key, e.target.value)}>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={f.type === 'date' || f.type === 'time' ? f.type : 'text'}
                value={values[f.key] ?? ''}
                placeholder={f.placeholder}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            )}
          </label>
        ))}
        <div className="form-actions full">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          {onDelete && <button type="button" className="btn btn-ghost btn-danger" onClick={onDelete}>Delete</button>}
        </div>
      </form>
    </div>
  );
}
