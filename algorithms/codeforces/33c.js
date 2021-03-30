/**
 * Task text
 * https://codeforces.com/problemset/problem/33/C
 */

let i = ''
process.stdin.on('data', c => i += c)
process.stdin.on('end', () => {
  const { EOL } = require('os')
  const lines = i.split(EOL) /*your input text, split by lines*/

  main(lines);
})

function main(lines) {
  let [n, nums] = lines;
  n = Number(n);
  nums = nums.split(' ').map(el => Number(el));

  let max = (a, b) => a > b ? a : b;
  let sum = 0;
  let ans = nums.reduce((acc, el) => {
    sum += el;
    sum = max(sum, 0);
    return max(acc, sum);
  } , 0);
  
  console.log(2 * ans - nums.reduce((acc, el) => acc + el));
}