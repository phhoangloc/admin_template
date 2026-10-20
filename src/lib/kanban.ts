export type ColId = 'todo' | 'doing' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  desc: string;
  tag: string; // key into TAGS
  assignee: string; // key into PEOPLE
  due: string; // YYYY-MM-DD, '' = none
}

export type Board = Record<ColId, Task[]>;

export const COLUMNS: { id: ColId; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

export const TAGS: Record<string, { label: string; hue: number }> = {
  design: { label: 'Design', hue: 300 },
  dev: { label: 'Dev', hue: 250 },
  marketing: { label: 'Marketing', hue: 50 },
  ops: { label: 'Operations', hue: 155 },
};

export const PEOPLE: Record<string, { name: string; initials: string; color: string }> = {
  sarah: { name: 'Sarah Nguyen', initials: 'SN', color: 'oklch(0.62 0.14 25)' },
  james: { name: 'James Tran', initials: 'JT', color: 'oklch(0.6 0.1 230)' },
  linh: { name: 'Linh Pham', initials: 'LP', color: 'oklch(0.6 0.1 300)' },
  emma: { name: 'Emma Vo', initials: 'EV', color: 'oklch(0.7 0.1 40)' },
};

export const seedBoard: Board = {
  todo: [
    { id: 't1', title: 'Photograph the new autumn menu', desc: 'Hero shots for the website and printed flyers.', tag: 'marketing', assignee: 'emma', due: '2026-10-28' },
    { id: 't2', title: 'Order oat milk for next month', desc: 'Compare Arc Company with the second supplier first.', tag: 'ops', assignee: 'linh', due: '2026-10-24' },
    { id: 't3', title: 'Loyalty card redesign', desc: '', tag: 'design', assignee: 'sarah', due: '' },
  ],
  doing: [
    { id: 't4', title: 'Build the online pre-order form', desc: 'Pickup time slots, item notes, and payment link.', tag: 'dev', assignee: 'james', due: '2026-10-22' },
    { id: 't5', title: 'Staff schedule for November', desc: 'Collect swap requests before publishing.', tag: 'ops', assignee: 'linh', due: '2026-10-26' },
  ],
  review: [
    { id: 't6', title: 'Halloween promo banner', desc: 'Waiting on final copy approval.', tag: 'design', assignee: 'sarah', due: '2026-10-21' },
    { id: 't7', title: 'Fix cart total rounding', desc: 'Totals differ by a cent when a discount is applied.', tag: 'dev', assignee: 'james', due: '2026-10-20' },
  ],
  done: [
    { id: 't8', title: 'Health inspection checklist', desc: 'Temperature logs and allergen records printed.', tag: 'ops', assignee: 'emma', due: '2026-10-19' },
    { id: 't9', title: 'Update opening hours on the site', desc: '', tag: 'dev', assignee: 'james', due: '2026-10-15' },
  ],
};
