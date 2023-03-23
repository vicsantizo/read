export function shortenText(text: string, desiredLength: number) {
  if (text.length <= desiredLength) return text;
  return text.slice(desiredLength).concat('.');
}
