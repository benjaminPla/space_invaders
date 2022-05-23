import Player from './Player.js';
import Enemy from './Enemy.js';
import Particles from './Particles.js';

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
const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push(new Particles(
    3,
    { x: 0, y: 2 },
    { x: Math.floor(Math.random() * game.width), y: Math.floor(Math.random() * game.height) },
    '#fff',
    'down',
    0)
  );
};

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
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, game.width, game.height);
    particles.map((particle, particleIndex) => {
      if ( particle.direction === 'down' && particle.position.y - particle.radius >= game.height) {
        particle.position.y = 0;
        particle.position.x = Math.random() * game.width;
      };
      if (particle.direction === 'random' && particle.lifeTime <= 0) particles.splice(particleIndex, 1);
      particle.update(ctx);
    });
    player.update(ctx);
    if (game.enemies.length > 0) {
      game.enemies.map(enemy => enemy.update(ctx));
    } else {
      setTimeout(() => {
        game.msg = 'You win!';
        game.stop = true;
      }, 1000);
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
              for (let i = 0; i < 10; i++) {
                particles.push(new Particles(
                  3,
                  { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 },
                  { x: enemy.position.x + enemy.width / 2, y: enemy.position.y + enemy.height / 2 },
                  '#E0479E',
                  'random',
                  Math.random() * 50));
              };
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
