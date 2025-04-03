export function decodeColor(value: number) {
  if (value === 0) {
    return "black";
  }
  else if (value === 1) {
    return "white";
  }
  return "lightgray";
}
