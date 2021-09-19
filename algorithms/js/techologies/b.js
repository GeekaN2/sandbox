// node .\b.js 6 60 140 61 100 300 59

let [,, ...numbers] = process.argv;
numbers = numbers.map(number => Number(number));

let ans = [-1, -1];
let counters = numbers.reduce((acc, num) => {
  acc[num] = acc[num] ? acc[num]++ : 1;

  return acc;
}, []);

const getSum = ([a, b]) => a + b;
const logPair = ([a, b]) => console.log(a, b);

for (let num of numbers) {
  for (let counter = 120 - num % 120; counter < num; counter += 120) {
    if (!counters[counter]) continue;
    
    if (getSum([num, counter]) > getSum(ans))
      ans = [num, counter];
  }

  counters[num]--;
}

logPair(ans);