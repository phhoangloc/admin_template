import CrudPage from '@/components/CrudPage';
import { userConfig } from '@/lib/configs';

export default function UserPage() {
  return <CrudPage config={userConfig} />;
}
