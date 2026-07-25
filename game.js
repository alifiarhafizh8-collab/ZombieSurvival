const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const healthText = document.getElementById("health");
const scoreText = document.getElementById("score");

const player = {
  x: 170,
  y: 500,
  size: 25,
  speed: 15,
  hp: 100
};

let score = 0;

const zombie = {
  x: 150,
  y: 50,
  size: 25,
  speed: 1.5
};

const left = document.getElementById("left");
const right = document.getElementById("right");
const up = document.getElementById("up");
const down = document.getElementById("down");
const attack = document.getElementById("attack");

left.onclick = () => player.x = Math.max(0, player.x - player.speed);
right.onclick = () => player.x = Math.min(canvas.width - player.size, player.x + player.speed);
up.onclick = () => player.y = Math.max(0, player.y - player.speed);
down.onclick = () => player.y = Math.min(canvas.height - player.size, player.y + player.speed);
function drawPlayer() {
  ctx.fillStyle = "deepskyblue";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawZombie() {
  ctx.fillStyle = "limegreen";
  ctx.fillRect(zombie.x, zombie.y, zombie.size, zombie.size);
}

function moveZombie() {
  if (zombie.x < player.x) zombie.x += zombie.speed;
  if (zombie.x > player.x) zombie.x -= zombie.speed;

  if (zombie.y < player.y) zombie.y += zombie.speed;
  if (zombie.y > player.y) zombie.y -= zombie.speed;
}

attack.onclick = () => {
  const jarak = Math.hypot(
    player.x - zombie.x,
    player.y - zombie.y
  );

  if (jarak < 50) {
    score += 10;
    scoreText.textContent = score;

    zombie.x = Math.random() * (canvas.width - zombie.size);
    zombie.y = Math.random() * 200;
  }
};

function checkHit() {
  const jarak = Math.hypot(
    player.x - zombie.x,
    player.y - zombie.y
  );

  if (jarak < 20) {
    player.hp--;

    if (player.hp < 0) player.hp = 0;

    healthText.textContent = player.hp;

    if (player.hp === 0) {
      alert("Game Over!\nSkor: " + score);
      location.reload();
    }
  }
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveZombie();
  checkHit();

  drawPlayer();
  drawZombie();

  requestAnimationFrame(gameLoop);
}

healthText.textContent = player.hp;
scoreText.textContent = score;

gameLoop();
