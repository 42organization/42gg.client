export function nameToRGB(name: string): string {
  const randomCode = [
    name.charCodeAt(0) % 128,
    name.charCodeAt(1) % 128,
    name.charCodeAt(2) % 128,
  ];

  if (randomCode[0] < 64 || randomCode[1] < 64 || randomCode[2] < 64) {
    randomCode[randomCode[0] % 3] = 128 - randomCode[randomCode[0] % 3];
  }
  const red = randomCode[0] + 64;
  const green = randomCode[1] + 64;
  const blue = randomCode[2] + 64;

  return `rgb(${red}, ${green}, ${blue})`;
}
