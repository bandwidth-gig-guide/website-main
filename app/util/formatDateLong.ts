export function formatDateLong(date: string | Date): string {
  const d = new Date(date);
  const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
  const year = d.getFullYear();
  const month = d.toLocaleDateString('en-US', { month: 'long' });
  const day = d.getDate();

  return `${dayOfWeek} · ${month} ${day}, ${year}`;
}