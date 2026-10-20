import CrudPage from '@/components/CrudPage';
import { fileConfig } from '@/lib/configs';

export default function FilePage() {
  return <CrudPage config={fileConfig} />;
}
