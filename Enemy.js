export default class Enemy {
  constructor(game, player, startPosition) {
    this.game = game;
    this.player = player;
    this.width = 50;
    this.height = 50;
    this.position = {
      x: startPosition.x,
      y: startPosition.y,
    };
    this.speed = 4;
    this.movement = 0;
    this.direction = 'rigth';
    const image = new Image();
    image.src = './sprites/enemy.png';
    this.image = image;
    this.canShoot = true;
    this.shootInterval = 400;
  };
  update(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    if (this.position.x <= 0 && this.direction === 'left') {
      this.direction = 'rigth';
      this.position.y += this.height;
    };
    if (this.position.x >= this.game.width - this.width && this.direction === 'rigth') {
       this.direction = 'left';
       this.position.y += this.height;
     };
    if (this.position.x >= 0 && this.direction === 'left') this.position.x -= this.speed;
    if (this.position.x <= this.game.width - this.width && this.direction === 'rigth') this.position.x += this.speed;
  };
};
