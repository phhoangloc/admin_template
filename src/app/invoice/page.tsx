'use client';

import CrudPage from '@/components/CrudPage';
import { invoiceConfig } from '@/lib/configs';
import { fmtMoney, sumBy } from '@/lib/money';

export default function InvoicePage() {
  return (
    <CrudPage
      config={invoiceConfig}
      summary={(rows) => {
        const by = (...s: string[]) => rows.filter((r) => s.includes(r.status));
        return [
          { label: 'Outstanding', value: fmtMoney(sumBy(by('Unpaid', 'Overdue'), 'amount')), note: by('Unpaid', 'Overdue').length + ' invoices' },
          { label: 'Overdue', value: fmtMoney(sumBy(by('Overdue'), 'amount')), note: by('Overdue').length + ' invoices' },
          { label: 'Paid', value: fmtMoney(sumBy(by('Paid'), 'amount')), note: by('Paid').length + ' invoices' },
          { label: 'Drafts', value: String(by('Draft').length), note: fmtMoney(sumBy(by('Draft'), 'amount')) + ' not sent' },
        ];
      }}
    />
  );
}
