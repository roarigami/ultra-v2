class Player {
  constructor(game) {
    this.position = {
      x: 0,
      y: 100
    }
  }

  update() {

  }

  draw(context) {
    context.fillRect(200, this.position.y, 100, 100);
    this.position.y++;
    // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y,
    // this.width, this.height);
  }

}
