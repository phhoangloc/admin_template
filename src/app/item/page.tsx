import CrudPage from '@/components/CrudPage';
import { itemConfig } from '@/lib/configs';

export default function ItemPage() {
  return <CrudPage config={itemConfig} />;
}
