'use client';

import CrudPage from '@/components/CrudPage';
import { orderConfig } from '@/lib/configs';
import { fmtMoney, sumBy } from '@/lib/money';

export default function OrderPage() {
  return (
    <CrudPage
      config={orderConfig}
      summary={(rows) => {
        const by = (status: string) => rows.filter((r) => r.status === status);
        return [
          { label: 'Total orders', value: String(rows.length) },
          { label: 'Pending', value: String(by('Pending').length), note: fmtMoney(sumBy(by('Pending'), 'total')) + ' waiting' },
          { label: 'Completed revenue', value: fmtMoney(sumBy(by('Completed'), 'total')), note: by('Completed').length + ' orders' },
          { label: 'Cancelled', value: String(by('Cancelled').length), note: fmtMoney(sumBy(by('Cancelled'), 'total')) + ' lost' },
        ];
      }}
    />
  );
}
