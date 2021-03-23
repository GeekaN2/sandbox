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
  let [str, ...boats] = lines;
  let [n, v] = str.split(' ');
  v = Number(v);
  boats = boats.map(boat => boat.split(' ').map(str => Number(str))).filter(boat => boat.length == 2);

  for (let i = 0; i < boats.length; i++) {
    boats[i][2] = i + 1;
  }

  let boats1 = boats.filter(boat => boat[0] == 1);
  let boats2 = boats.filter(boat => boat[0] == 2);

  boats1 = boats1.sort((a, b) => b[1] - a[1]);
  boats2 = boats2.sort((a, b) => b[1] - a[1]);

  let i1 = 0, i2 = 0, sum = 0;
  let lastBoat = [];
  let preLastBoat = false;

  while (sum < v - 1 && (boats1[i1] || boats2[i2])) {
    if (!boats1[i1]) {
      if (v - sum >= 2) {
        lastBoat = boats2[i2];
        sum += 2;
        i2++;
      }
    }

    if (!boats2[i2]) {
      if (v - sum >= 1) {
        lastBoat = boats1[i1];
        sum += 1;
        i1++;
      }
    }

    if (boats1[i1] && boats2[i2] && v - sum >= 2) {
      if (boats1.length - i1 >= 2) {
        if (boats1[i1][1] + boats1[i1 + 1][1] > boats2[i2][1]) {
          lastBoat = boats1[i1 + 1];
          sum += 2;
          i1 += 2;
        } else {
          lastBoat = boats2[i2];
          sum += 2;
          i2++;
        }
      } else if (boats1.length - i1 == 1) {
        if (boats1[i1][1] > boats2[i2][1]) {
          lastBoat = boats1[i1];
          sum++;
          i1++;
        } else {
          lastBoat = boats2[i2];
          sum += 2;
          i2++;
        }
      }
    } 
  }

  if (v - sum == 1 && boats1[i1] && boats2[i2] && lastBoat[0] == 1) {
    if (boats2[i2][1] > lastBoat[1] + boats1[i1][1]) {
      i1--;
      i2++;
    } else if (lastBoat[1] + boats1[i1][1] >= boats2[i2][1]) {
      i1++;
    }
  } else if (v - sum == 1 && !boats1[i1] && boats2[i2] && boats2[i2][1] > boats1[i1 - 1][1]) {
    i1--;
    i2++;
  } 

  let ans = [];
  let s = 0;

  for (let i = 0; i < i1; i++) {
    ans.push(boats1[i][2]);
    s += boats1[i][1];
  }

  for (let i = 0; i < i2; i++) {
    ans.push(boats2[i][2]);
    s += boats2[i][1];
  }

  console.log(s);
  console.log(ans.sort((a, b) => a - b).join(' '));
}