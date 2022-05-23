export default class Particles {
  constructor(radius, speed, position, color, direction, lifeTime) {
    this.radius = Math.random() * radius;
    this.speed = {
      x: speed.x,
      y: speed.y,
    };
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.color = color;
    this.direction = direction;
    this.lifeTime = lifeTime;
  };
  update(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    if (this.direction === 'down') {
      this.position.y += this.speed.y
    } else {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
      this.lifeTime--;
    };
  };
};
