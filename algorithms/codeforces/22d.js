/**
 * Task text
 * https://codeforces.com/problemset/problem/22/D
 */

let i = ''
process.stdin.on('data', c => i += c)
process.stdin.on('end', () => {
  const { EOL } = require('os')
  const lines = i.split(EOL) /*your input text, split by lines*/

  main(lines);
})

function main(lines) {
  let [n, ...segments] = lines;

  segments = segments.map(seg => seg.split(' ').map(el => Number(el))).filter(el => el.length == 2);
  segments = segments.map(seg => seg.sort((a, b) => a - b)).sort((a, b) => a[0] - b[0]);

  let ends = segments.map(el => el[1]).sort((a, b) => a - b);
  let i1 = 0, i2 = 0, segs = [], nails = [];

  for (let i = -10000; i <= 10000 && segments.length > 0; i++) {
    if (segments[i1] && segments[i1][0] == i) {
      segs.push(segments[i1]);
      i1++;
    }

    if (ends[i2] == i) {
      segments = segments.filter(el => el[0] > i);
      ends = segments.map(seg => seg[1]).sort((a, b) => a - b);
      i1 = i1 = 0;
      segs = [];
      nails.push(i);
    }
  }

  if (segs.length > 0) {
    nails.push(ends[i2]);
  }

  console.log(nails.length);
  console.log(nails.join(' '));
}