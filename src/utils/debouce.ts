export function debounce<T extends Function>(callback: T, timeout: number) {
  let timeoutId: any = 0;
  const callable = (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), timeout);
  };

  return <T>(callable as any);
}
