import Bullet from './Bullet.js';

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.height = 50;
    this.position = {
      x: this.game.width / 2,
      y: this.game.height - this.height - 10,
    };
    this.speed = 5;
    this.movement = 0;
    const image = new Image();
    image.src = './sprites/player.png';
    this.image = image;
    this.keys = {
      left: { key: 'ArrowLeft', pressed: false },
      rigth: { key: 'ArrowRight', pressed: false },
      space: { key: ' ', pressed: false },
    };
    this.canShoot = true;
    this.shootInterval = 400;
  };
  update(ctx) {
    document.addEventListener('keydown', ({ key }) => {
      switch(key) {
        case this.keys.left.key:
          this.keys.left.pressed = true;
          break;
        case this.keys.rigth.key:
          this.keys.rigth.pressed = true;
          break;
        case this.keys.space.key:
          this.keys.space.pressed = true;
          break;
      };
    });
    document.addEventListener('keyup', ({ key }) => {
      switch(key) {
        case this.keys.left.key:
          this.keys.left.pressed = false;
          break;
        case this.keys.rigth.key:
          this.keys.rigth.pressed = false;
          break;
        case this.keys.space.key:
          this.keys.space.pressed = false;
          break;
      };
    });
    if (this.keys.space.pressed && this.canShoot) {
      this.canShoot = false;
      this.game.bullets.push(new Bullet(this.game, this));
      setTimeout(() => {
        this.canShoot = true;
      }, this.shootInterval);
    };
    if (this.position.x >= 0 && this.keys.left.pressed) this.position.x -= this.speed;
    if (this.position.x <= this.game.width - this.width && this.keys.rigth.pressed) this.position.x += this.speed;
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  };
};
