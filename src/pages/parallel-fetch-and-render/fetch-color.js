export const fetchColor = (index) => {
  return new Promise(resolve => {
    const color = ['blue', 'green', 'red', 'purple', 'orange'][index % 5];
    setTimeout(() => resolve(color), Math.random() * 10000 + 1000);
  });
};