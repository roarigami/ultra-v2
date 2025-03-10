
class CollisionBlock {
  constructor({position, blockHeight = 16}) {
      this.position = position;
      this.width = 16;
      this.height = blockHeight;
  }

  draw(context) {
      context.fillStyle = 'rgba(255, 0, 0, 0.5)';
      context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {

  }
}
