// node v14.7.0
// Запускать как node .\a.js 5 66 12 99 100 99

let [,, ...numbers] = process.argv;

numbers = numbers.map(number => Number(number))
  .filter(number => number % 2 === 1).sort((a, b) => b - a);

const only33 = numbers.filter(number => number % 33 === 0);
const onlyOdd = numbers.filter(number => number % 33 !== 0);

const getSum = ([a, b]) => a + b;
const logPair = ([a, b]) => console.log(a, b);
const firstPair = [only33?.[0], only33?.[1]];
const secondPair = [only33?.[0], onlyOdd?.[0]];
const firstSum = getSum(firstPair);
const secondSum = getSum(secondPair);

if (firstSum && secondSum) return firstSum > secondSum ? logPair(firstPair) : logPair(secondPair);
if (!firstSum && !secondSum) return logPair([0, 0]);
if (!firstSum || !secondSum) return firstSum ? logPair(firstPair) : logPair(secondPair);

