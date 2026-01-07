export function convertToDateString(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function extractYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}
