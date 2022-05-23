export default class Bullet {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.width = 5;
    this.height = 30;
    this.position = {
      x: this.player.position.x + this.player.width / 2 - this.width / 2,
      y: this.player.position.y - this.height - 10,
    };
    this.speed = 10;
  };
  update(ctx) {
    ctx.beginPath();
    // ctx.fillStyle = '#009797';
    ctx.fillStyle = '#DE4700';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.closePath();
    this.position.y -= this.speed;
  };
};
