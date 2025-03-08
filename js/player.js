class Player {
  constructor(game) {
    this.game = game;
    this.width = 160;
    this.height = 111;
    this.gravity = 0.5;
    this.speed = 10;
    this.position = {
      x: 0,
      y: 200//this.game.height - this.height
    }
    this.velocity = {
      x: 0,
      y: 1
    }
  }

  update(input) {
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;

    if(input.includes('ArrowRight')) this.position.x += this.speed;

    else if(input.includes('ArrowLeft')) this.position.x -= this.speed;

    //Horizontal Boundaries
    if(this.position.x < 0) this.position.x = 0;
    if(this.position.x > this.game.width - this.width) this.position.x = this.game.width - this.width;

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
