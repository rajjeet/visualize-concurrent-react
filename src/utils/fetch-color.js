let palettes = [
  ['blue', 'green', 'red', 'purple', 'orange'],
  ['lightgreen', 'yellow', 'darkred', 'black', 'magenta'],
];

export const fetchColor = (index, timeout, palette = 0) => {
  timeout = timeout == null ? Math.random() * 10000 + 1000 : timeout * Math.random();
  return new Promise(resolve => {

    const color = palettes[palette][index % 5];
    setTimeout(() => resolve(color), timeout);
  });
};