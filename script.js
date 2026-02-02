const colors = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

/* DOM */
const title = document.getElementById("level-title");
const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("high-score");
const startBtn = document.getElementById("start-btn");

/* High Score from localStorage */
let highScore = localStorage.getItem("simonHighScore") || 0;
highScoreText.innerText = highScore;

/* 🔊 Sound */
function playSound(color) {
  const audio = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound" +
    (colors.indexOf(color) + 1) +
    ".mp3"
  );
  audio.play();
}

/* Button animation */
function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");

  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 200);
}

/* Start Game */
startBtn.addEventListener("click", () => {
  if (!started) startGame();
});

function startGame() {
  started = true;
  level = 0;
  gamePattern = [];
  nextSequence();
}

/* Next Level */
function nextSequence() {
  userPattern = [];
  level++;

  levelText.innerText = level;      // level display
  scoreText.innerText = level - 1; // score

  title.innerText = "Level " + level;

  const randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  animatePress(randomColor);
  playSound(randomColor);
}

/* User Click */
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {

    if (!started) return;

    const color = this.id;
    userPattern.push(color);

    animatePress(color);
    playSound(color);

    checkAnswer(userPattern.length - 1);
  });
});

/* Check Answer */
function checkAnswer(index) {
  if (userPattern[index] === gamePattern[index]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 700);
    }
  } else {
    gameOver();
  }
}

/* Game Over */
function gameOver() {
  playSound("red");

  document.body.classList.add("game-over");

  const finalScore = level - 1;

  title.innerText = "Game Over! Final Score: " + finalScore;

  /* Update High Score */
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("simonHighScore", highScore);
    highScoreText.innerText = highScore;
  }

  levelText.innerText = 0;
  scoreText.innerText = 0;

  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 300);

  started = false;
}
