
class Sprite {
  constructor({position, imgsrc}) {
    this.position = position;
    this.image = new Image();
    this.image.src = imgsrc;
  }

  draw(context) {
    if(!this.image) return;
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  update(context) {
    this.draw(context);
  }
}
