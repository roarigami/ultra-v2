
class Sprite {
  constructor({position, imgsrc, frameRate = 1, frameBuffer = 3, scale = 1}) {
    this.position = position;
    this.scale = scale;

    this.image = new Image();
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;

    this.image.onload = () => {
        this.width = (this.image.width / this.frameRate) * this.scale;
        this.height = (this.image.height) * this.scale;
    }
    this.image.src = imgsrc;
  }

  draw(context) {
    if(!this.image) return;

    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0
      },
      width: this.image.width / this.frameRate,
      height: this.image.height
    }

    context.drawImage(this.image,
                      cropbox.position.x,
                      cropbox.position.y,
                      cropbox.width,
                      cropbox.height,
                      this.position.x,
                      this.position.y,
                      this.width,
                      this.height);
  }

  update(context) {
    this.draw(context);
    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;

    if(this.elapsedFrames % this.frameBuffer === 0) {
        if(this.currentFrame < this.frameRate - 1) this.currentFrame++;
          else this.currentFrame = 0;
    }

  }
}
