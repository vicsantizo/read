export function cutString(text: string, desiredLength: number): string {
  if (text.length <= desiredLength) return text;
  return text.slice(0, desiredLength).concat('.');
}
