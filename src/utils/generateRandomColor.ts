export function generateRandomColor() {
  const getColor = () => {
    const color = Math.round(Math.random() * 255).toString(16);
    if (color.length === 1) {
      return `${color}0`;
    }

    return color;
  };
  const r = getColor();
  const g = getColor();
  const b = getColor();
  return `#${r}${g}${b}`;
}
