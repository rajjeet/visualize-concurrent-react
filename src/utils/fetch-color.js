let palettes = [
  ['blue', 'green', 'red', 'purple', 'orange'],
  ['lightgreen', 'yellow', 'darkred', 'black', 'magenta'],
];

export const fetchColor = (index, timeout, palette = 0) => {
  timeout = timeout == null ? Math.random() * 10000 + 1000 : timeout * Math.random();
  let timeoutFn;
  let promise = new Promise(resolve => {

    const color = palettes[palette][index % 5];
    timeoutFn = setTimeout(() => resolve(color), timeout);
  });

  return {
    cancel() {
      if (timeoutFn) clearTimeout(timeoutFn);
    },
   promise
  }
};