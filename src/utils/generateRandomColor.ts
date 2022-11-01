export function generateRandomColor(): string {
  const getColor = () => {
    const colorDecimal = Math.round(Math.random() * 255);
    let colorHex = colorDecimal.toString(16);
    if (colorHex.length === 1) {
      colorHex = `${colorHex}0`;
    }

    return {colorDecimal, colorHex};
  };

  const r = getColor();
  const g = getColor();
  const b = getColor();

  const isDarkColor =
    (r.colorDecimal + g.colorDecimal + b.colorDecimal) / 3 < 127;

  if (isDarkColor) {
    return generateRandomColor();
  }

  return `#${r.colorHex}${g.colorHex}${b.colorHex}`;
}
