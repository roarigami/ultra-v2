class Player {
  constructor(game) {
    this.game = game;
    this.width = 200;
    this.height = 200;
    this.gravity = 0.5;
    this.position = {
      x: 0,
      y: 200//this.game.height - this.height
    }
    this.velocity = {
      x: 0,
      y: 1
    }
  }

  update(context) {
    this.draw(context);
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;

    //vertical movement
    // if(input.includes('ArrowUp') && this.onGround()) this.vy -= 25;
    if(!this.onGround()) this.velocity.y += this.gravity;
    else this.velocity.y = 0;

    //Vertical Boundaries
    if(this.position.y > this.game.height - this.height - this.game.groundMargin) {
        this.position.y = this.game.height - this.height - this.game.groundMargin;
    }
  }

  draw(context) {
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y,
    // this.width, this.height);
  }

  onGround() {
      return this.position.y >= this.game.height - this.height - this.game.groundMargin;
  }

}
