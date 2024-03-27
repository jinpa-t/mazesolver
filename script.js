// Jul 27th 2023
// Solve maze using breath first search. And backtrack to find the most optimal route.
const N = 4;
const M = 6;

class Point {
  constructor(x, y, w) {
    this.row = x;
    this.col = y;
    this.dist = w;
  }
  path = [];
}

function minDistance(grid) {
  const source = new Point(0, 0, 0);

  var visited = new Array(N);
  for (let i = 0; i < N; i++) {
    visited[i] = new Array(M).fill(false);
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (grid[i][j] === "0") {
        visited[i][j] = true;
      } else {
        visited[i][j] = false;
      }

      if (grid[i][j] === "s") {
        source.row = i;
        source.col = j;
      }
    }
  }

  const q = [];
  source.path.push(source);
  q.push(source);

  visited[source.row][source.col] = true;
  while (q.length > 0) {
    const p = q.shift();
    // check if the destination point has been reached
    if (grid[p.row][p.col] === "d") {
      //console.log(p.path);
      var curr_dist = p.dist;
      var curr_coord = { x: p.row, y: p.col };
      var paths = p.path;
      for (var i = paths.length - 1; i > 0; i--) {
        // only change color if the distance is curr - 1 and there is a direct path.
        // up
        //console.log("current coord: ",paths[i-1].row,paths[i-1].col,curr_dist)
        // only check the path that gets you closer to the start point
        if (paths[i - 1].dist == curr_dist - 1) {
          var i_container = document.querySelectorAll(".flex-container");
          // up
          if (
            curr_coord.x - 1 >= 0 &&
            curr_coord.x - 1 == paths[i - 1].row &&
            curr_coord.y == paths[i - 1].col
          ) {
            i_container[paths[i - 1].row].children[
              paths[i - 1].col
            ].style.backgroundColor = "purple";
            curr_dist = paths[i - 1].dist;
            curr_coord = { x: paths[i - 1].row, y: paths[i - 1].col };
          }
          // down
          if (
            curr_coord.x + 1 < N &&
            curr_coord.x + 1 == paths[i - 1].row &&
            curr_coord.y == p.path[i + 1].col
          ) {
            i_container[paths[i - 1].row].children[
              paths[i - 1].col
            ].style.backgroundColor = "purple";
            curr_dist = paths[i - 1].dist;
            curr_coord = { x: paths[i - 1].row, y: paths[i - 1].col };
          }
          // left
          if (
            curr_coord.y - 1 >= 0 &&
            curr_coord.y - 1 == paths[i - 1].col &&
            curr_coord.x == paths[i - 1].row
          ) {
            i_container[paths[i - 1].row].children[
              paths[i - 1].col
            ].style.backgroundColor = "purple";
            curr_dist = paths[i - 1].dist;
            curr_coord = { x: paths[i - 1].row, y: paths[i - 1].col };
          }
          // right
          if (
            curr_coord.y + 1 < M &&
            curr_coord.y + 1 == paths[i - 1].col &&
            curr_coord.x == paths[i - 1].row
          ) {
            i_container[paths[i - 1].row].children[
              paths[i - 1].col
            ].style.backgroundColor = "purple";
            curr_dist = paths[i - 1].dist;
            curr_coord = { x: paths[i - 1].row, y: paths[i - 1].col };
          }
        }
      }
      return p.dist;
    }

    if (p.row - 1 >= 0 && visited[p.row - 1][p.col] === false) {
      let point = new Point(p.row - 1, p.col, p.dist + 1);
      point.path = p.path;
      point.path.push(point);
      q.push(point);
      visited[p.row - 1][p.col] = true;
    }
    if (p.row + 1 < N && visited[p.row + 1][p.col] === false) {
      let point = new Point(p.row + 1, p.col, p.dist + 1);
      point.path = p.path;
      point.path.push(point);
      q.push(point);
      visited[p.row + 1][p.col] = true;
    }
    if (p.col - 1 >= 0 && visited[p.row][p.col - 1] === false) {
      let point = new Point(p.row, p.col - 1, p.dist + 1);
      point.path = p.path;
      point.path.push(point);
      q.push(point);
      visited[p.row][p.col - 1] = true;
    }
    if (p.col + 1 < M && visited[p.row][p.col + 1] === false) {
      let point = new Point(p.row, p.col + 1, p.dist + 1);
      point.path = p.path;
      point.path.push(point);
      q.push(point);
      visited[p.row][p.col + 1] = true;
    }
    //console.log(JSON.stringify(visited))
  }
  return -1;
}

const grid = [
  ["0", "*", "0", "s", "*", "0"],
  ["*", "*", "*", "0", "*", "*"],
  ["*", "0", "*", "*", "*", "*"],
  ["d", "0", "*", "*", "0", "*"],
];

var distance = minDistance(grid);
document.querySelector("#res").innerHTML = "Distance = " + distance;
console.log("Shortest distance: " + distance);

// update values in the html
function updateVal() {
  for (var i = 0; i < N; i++) {
    var i_container = document.querySelectorAll(".flex-container")[i];
    for (var j = 0; j < M; j++) {
      i_container.children[j].innerHTML = grid[i][j];
      if (grid[i][j] == "s") {
        i_container.children[j].style.backgroundColor = "green";
      } else if (grid[i][j] == "d") {
        i_container.children[j].style.backgroundColor = "red";
      }
    }
  }
}
updateVal();
