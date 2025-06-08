export function cutAtLastWholeWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const cutIndex = text.lastIndexOf(' ', maxLength);
  return (cutIndex > 0 ? text.slice(0, cutIndex) : text.slice(0, maxLength)) + '...';
}
