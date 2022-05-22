import Player from './Player.js';
import Enemy from './Enemy.js';

const gameMsg = document.getElementById('gameMsg');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Game {
  constructor() {
    this.width = 800;
    this.height = 600;
    this.stop = false;
    this.enemies = [];
    this.bullets = [];
    this.msg = '';
  };
};

const game = new Game()
const player = new Player(game);

const rows = 3;
const columns = 10;
for (let column = 0; column < columns; column++) {
  for (let row = 0; row < rows; row++) {
    game.enemies.push(new Enemy(game, player, {
      x: column * 50,
      y: row * 50,
    }))
  };
};

function update() {
  if (!game.stop) {
    requestAnimationFrame(update);
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, game.width, game.height);
    player.update(ctx);
    if (game.enemies.length > 0) {
      game.enemies.map(enemy => enemy.update(ctx));
    } else {
      game.msg = 'You win!';
      game.stop = true;
    };
    if (game.bullets.length > 0) {
      game.bullets.map((bullet, bulletIndex) => {
        if (bullet.position.y <= 0) {
          game.bullets.splice(bulletIndex, 1);
        };
        bullet.update(ctx);
        game.enemies.map((enemy, enemyIndex) => {
          if (bullet.position.y <= enemy.position.y + enemy.height) {
            if (bullet.position.x >= enemy.position.x && bullet.position.x + bullet.width <= enemy.position.x + enemy.width) {
              game.enemies.splice(enemyIndex, 1);
              game.bullets.splice(bulletIndex, 1);
            };
          };
        });
      });
    };
  } else {
    gameMsg.textContent = game.msg;
  };
};

update();
