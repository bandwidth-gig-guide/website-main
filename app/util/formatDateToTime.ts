export function formatDateToTime(date: string | Date): string {
  const d = new Date(date);
  return d
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .replace(' ', '')
    .toLowerCase();
}
