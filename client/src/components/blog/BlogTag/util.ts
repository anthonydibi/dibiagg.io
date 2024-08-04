export const lightShadow = (baseColor: string) => {
  const floorMultiply = (n: string) => {
    return Math.floor(Math.min(parseInt(n, 16) * 0.85, 255)).toString(16);
  };
  const r = baseColor.substring(1, 3);
  const g = baseColor.substring(3, 5);
  const b = baseColor.substring(5, 7);
  return `#${floorMultiply(r)}${floorMultiply(g)}${floorMultiply(b)}`;
};

export const darkShadow = (baseColor: string) => {
  const floorMultiply = (n: string) => {
    return Math.floor(Math.min(parseInt(n, 16) * 1.15, 255)).toString(16);
  };
  const r = baseColor.substring(1, 3);
  const g = baseColor.substring(3, 5);
  const b = baseColor.substring(5, 7);
  return `#${floorMultiply(r)}${floorMultiply(g)}${floorMultiply(b)}`;
};
