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

/**
 * Accepts a "host" config value that may be a bare hostname/IP or a full URL
 * (e.g. a reverse-proxied domain someone pastes straight from their browser
 * bar) and normalizes it into separate protocol/host/port parts.
 */
export function parseEmbyHost(
  rawHost: string,
  fallbackProtocol: string,
  fallbackPort?: number,
): { protocol: string; host: string; port?: number } {
  const trimmed = rawHost.trim().replace(/\/+$/, '');
  if (/^https?:\/\//i.test(trimmed)) {
    const url = new URL(trimmed);
    return {
      protocol: url.protocol.replace(':', ''),
      host: url.hostname,
      port: url.port ? Number(url.port) : undefined,
    };
  }
  return { protocol: fallbackProtocol, host: trimmed, port: fallbackPort };
}
