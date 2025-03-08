class Player {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
  }

  update() {

  }

  draw() {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y,
    this.width, this.height);
  }

}
