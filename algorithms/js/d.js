function scan(map) {
  let ans = {
    ceil: 0,
    floor: 0,
    both: 0
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      map[i][j] = {
        value: map[i][j],
        visited: false,
      }
    }
  }

  let isInRange = (i, j) => {
    return i >= 0 && i < map.length && j >= 0 && j < map[0].length;
  }

  //BFS
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j].value && !map[i][j].visited) {
        // start BFS
        let mini = map.length;
        let maxi = -1;
        let dx = [0, 0, 1, -1];
        let dy = [1, -1, 0, 0];
        let queue = [[i, j]];

        while (queue.length) {
          let [x, y] = queue.shift();

          map[x][y].visited = true;

          if (x < mini) {
            mini = x; 
          }

          if (x > maxi) {
            maxi = x;
          }

          for (let k = 0; k < dx.length; k++){
            let nextx = x + dx[k], nexty = y + dy[k];

            if (isInRange(nextx, nexty) && map[nextx][nexty].value == 1 && !map[nextx][nexty].visited) {
              queue.push([nextx, nexty]);
            }
          }
        }

        if (mini == 0 && maxi == map.length - 1) {
          ans.both++;
        }

        if (mini == 0 && maxi < map.length - 1) {
          ans.ceil++;
        }

        if (mini > 0 && maxi == map.length - 1) {
          ans.floor++;
        }
      }
    }
  }

  return ans;
}

module.exports = { scan };

console.log(scan([  
  [1, 0, 1],  
  [1, 1, 1],  
  [0, 0, 1]  
]))