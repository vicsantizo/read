export function formatDate(date: Date) {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  if (formattedDate == 'Invalid Date') return 'N/A';
  return formattedDate;
}
