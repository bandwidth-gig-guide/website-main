export function formatDateShort(date: string | Date): string {
  const d = new Date(date);
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const day = d.getDate(); // 20
  let hour = d.getHours();
  let minute = d.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;

  const minuteStr = minute.toString().padStart(2, '0');
  return `${month} ${day}, ${hour}:${minuteStr}${ampm}`;
}