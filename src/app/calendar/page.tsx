import CalendarView from '@/components/CalendarView';
import { calendarConfig } from '@/lib/configs';

export default function CalendarPage() {
  return <CalendarView config={calendarConfig} />;
}
