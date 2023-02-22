export function getRandomColor() {
  // Generate a random number between 0 and 255 for each RGB value
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // Return the RGB color string in the format "rgb(r, g, b)"
  return `rgb(${r}, ${g}, ${b})`;
}
