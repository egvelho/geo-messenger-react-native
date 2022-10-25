export function generateRandomColor() {
  const getColor = () => Math.round(Math.random() * 255).toString(16);
  const r = getColor();
  const g = getColor();
  const b = getColor();
  return `#${r}${g}${b}`;
}
