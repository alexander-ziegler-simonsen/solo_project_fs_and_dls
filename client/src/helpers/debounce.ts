// utils/debounce.ts
export function debounce<F extends (...args: any[]) => void>(fn: F, delayMs: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delayMs);
  };
}
