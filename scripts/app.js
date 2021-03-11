const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const scoreCount = document.getElementById("score");
const highScoreCount = document.getElementById("highscore");

let primary = "#6AC502";
let secondary = "#AE17DB";
let highscore = 0;
let nameHighScore = "";

const grid = 32; //size of 1 cell
let count = 0; //to manipulate frames per sec
let score = 0;

let snake = {
  //the playable character
  x: grid * 5, //coordinate of where snake starts
  y: grid * 5,

  vx: grid, //velocity of the snake or how far the snake moves per frame
  vy: 0, //so it doesnt move diagonally

  cells: [], //additional cells of snakes are stored here

  maxCells: 4, //number of cells the snake starts with
};

let food = {
  x: grid * 10, //starting point of food
  y: grid * 10,
};

function startGame() {
  requestAnimationFrame(startGame); //so that it keeps on running

  if (++count < 8) {
    //divides the frames per second by 4 making it 15 fps
    return;
  }
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.vx; //to move the snake
  snake.y += snake.vy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid; //to bring the snake back after it passes through the edge of the canvas
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid; //to bring the snake back after it passes through the edge of the canvas
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    //remove the last cell
    snake.cells.pop();
  }

  // Draw Apple
  ctx.fillStyle = secondary;
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1); //for the gap between cells of snake

  // Draw snake

  ctx.fillStyle = primary;
  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;
      score++;

      food.x = getRandomInt(0, 24) * grid;
      food.y = getRandomInt(0, 14) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        if (localStorage.getItem("highscore", highscore) < score) {
          highscore = score;
          localStorage.setItem("highscore", highscore);
          nameHighScore = prompt("You beat the highscore!! What's your name?");
          localStorage.setItem("name", nameHighScore);
          window.location.reload();
        }
        window.location.reload();
      }
    }
  });

  // Draw score
  // ctx.font = "72px Helvetica";
  // ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  // ctx.textAlign = "center";
  // ctx.fillText(score, canvas.width / 2, canvas.height / 2);
  scoreCount.textContent = `Your Score: ${score}`;
  highScoreCount.textContent = `${localStorage.getItem(
    "name"
  )}'s HighScore: ${localStorage.getItem("highscore")}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", function (evt) {
  if (evt.which === 37 && snake.vx === 0) {
    snake.vx = -grid;
    snake.vy = 0;
  } else if (evt.which === 38 && snake.vy === 0) {
    snake.vy = -grid;
    snake.vx = 0;
  } else if (evt.which === 39 && snake.vx === 0) {
    snake.vx = grid;
    snake.vy = 0;
  } else if (evt.which === 40 && snake.vy === 0) {
    snake.vy = grid;
    snake.vx = 0;
  } else if (evt.which === 65 && snake.vx === 0) {
    snake.vx = -grid;
    snake.vy = 0;
  } else if (evt.which === 87 && snake.vy === 0) {
    snake.vy = -grid;
    snake.vx = 0;
  } else if (evt.which === 68 && snake.vx === 0) {
    snake.vx = grid;
    snake.vy = 0;
  } else if (evt.which === 83 && snake.vy === 0) {
    snake.vy = grid;
    snake.vx = 0;
  }
});

//starts the game
requestAnimationFrame(startGame); //sets the fps to 60
