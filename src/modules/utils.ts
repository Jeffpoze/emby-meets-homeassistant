const TICKS_PER_SECOND = 10_000_000;

export function ticksToSeconds(ticks?: number): number {
  return ticks ? ticks / TICKS_PER_SECOND : 0;
}

export function formatRuntime(ticks?: number): string {
  const totalMinutes = Math.round(ticksToSeconds(ticks) / 60);
  if (!totalMinutes) return '';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), waitMs);
  };
}

export function matchesSearch(term: string, ...haystacks: (string | undefined)[]): boolean {
  const needle = term.trim().toLowerCase();
  if (!needle) return true;
  const words = needle.split(/\s+/).filter(Boolean);
  const combined = haystacks.filter(Boolean).join(' ').toLowerCase();
  return words.every((word) => combined.includes(word));
}
