// "Wednesday · April 09, 1997"
export function formatDateLong(date: string | Date): string {
  const d = new Date(date);
  const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
  const year = d.getFullYear();
  const month = d.toLocaleDateString('en-US', { month: 'long' });
  const day = d.getDate();

  return `${dayOfWeek} · ${month} ${day}, ${year}`;
}


// "Apr 09, 11:30am" 
export function formatDateShort(date: string | Date): string {
  const d = new Date(date);
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const day = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;
  const minuteStr = minute.toString().padStart(2, '0');

  return `${month} ${day}, ${hour}:${minuteStr}${ampm}`; 
}

// "11:30am"
export function formatDateToTime(date: string | Date): string {
  const d = new Date(date);
  let hour = d.getHours();
  let minute = d.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;
  const minuteStr = minute.toString().padStart(2, '0');

  return `${hour}:${minuteStr}${ampm}`;
}
