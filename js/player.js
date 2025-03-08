class Player {
  constructor(game) {
    this.game = game;
    this.height = 91.3;
    this.position = {
      x: 0,
      y: this.game.height - this.height
    }
    this.velocity = {
      x: 0,
      y: 1
    }
  }

  update(context) {
    this.draw(context);
    this.position.y += this.velocity.y;
    this.velocity.y += 0.5;
  }

  draw(context) {
    context.fillRect(this.position.x, this.position.y, 100, 100);
    // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y,
    // this.width, this.height);
  }

}
