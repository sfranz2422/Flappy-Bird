let speed = 2;
let flappyBird, obstacles;
let score = 0;
let highScore = 0;
let gameOver = false;
function setup() {
  new Canvas(800, 600);

  world.gravity.y = 5;

  flappyBird = new Sprite();
  flappyBird.x = 50;
  flappyBird.y = height / 2;
  flappyBird.diameter = 20;
  flappyBird.collider = "dynamic";
  flappyBird.color = "yellow";

  obstacles = new Group();
  obstacles.collider = "kinematic";
  obstacles.height = 400;
  obstacles.width = 50;

  obstacles.color = "green";
  setInterval(spawn, 1500);
  setInterval(setScore, 1000);
  highScore = updateHighscore(score)
  flappyBird.overlaps(obstacles, lose);
}

function draw() {
  // world.step()
  clear();
  background(220);

  camera.x = flappyBird.x + 100;
  flappyBird.vel.x = speed;

  controls();
  displayScore();
}

function controls() {
  //gravity is an acceleration so the velocity is always increasing...that's why we need
  // the -= 5 and not just -5
  if (kb.presses("space")) {
    flappyBird.vel.y -= 5;
  }

  if (flappyBird.y > height - 10) {
    lose();

    // leave these next lines here at first and explain why it gets so fast. ...bird
    // is falling and velocity is increasing bc of gravity and your just repositioning
  } else if (flappyBird.y < 10) {
    lose();
  }
}

function spawn() {
  // let gapSize = random(150, 320)
  let gapSize = 180;
  //this is a subgroup.
  let top = new obstacles.Sprite();

  top.y = random(-150, height / 6);
  top.x = flappyBird.x + width;

  let bottom = new obstacles.Sprite();
  // bottom.y = top.height + gapSize * random(1,100)
  bottom.y = top.height + top.y + gapSize;
  bottom.x = flappyBird.x + width;

}
function lose(b, o) {
  // o.color = "red"
  speed = 2;
  flappyBird.y = height / 2;
  flappyBird.x = 50;
  flappyBird.vel.x = 0;
  flappyBird.vel.y = 0;
  obstacles.removeAll();
  highScore = updateHighscore(score);
  score = 0;
  // world.autoStep = false;
  // gameOver = true;
}
function setScore() {
  score += 1;
}
function displayScore() {
  textSize(18);
  text("Score: " + score, 82, 17);
  textSize(18);
  text("High Score: " + highScore, 170, 17);
}

function updateHighscore(newScore) {
  // get current highscore
  const oldHighscore = parseFloat(localStorage.getItem("flappyscore234562"));
  if (
    oldHighscore !== oldHighscore || // if it doesn't exist yet
    oldHighscore < newScore
  ) {
    // or if it's smaller than the new score (I assume bigger means better here)
    // current highscore needs to be updated
    localStorage.setItem("flappyscore234562", newScore);
    return newScore;
  }
  return oldHighscore;
}
