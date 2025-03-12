
class Sprite {
  constructor({position, imgsrc, frameCount = 1, frameBuffer = 3, scale = 1}) {
    this.position = position;
    this.scale = scale;
    this.loaded = false;

    this.image = new Image();
    this.frameCount = frameCount;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;

    this.image.onload = () => {
        this.width = (this.image.width / this.frameCount) * this.scale;
        this.height = (this.image.height) * this.scale;
        this.loaded = true;
    }
    this.image.src = imgsrc;
  }

  draw(context, deltaTime) {
    if(!this.image) return;

    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameCount),
        y: 0
      },
      width: this.image.width / this.frameCount,
      height: this.image.height
    }
    //console.log(this.image);
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

  update(context, deltaTime) {
    //console.log(deltaTime)
    this.draw(context);
    this.updateFrames(deltaTime);
  }

  updateFrames(deltaTime) {

    this.elapsedFrames++;

    if(this.elapsedFrames % this.frameBuffer === 0) {
        if(this.currentFrame < this.frameCount - 1) this.currentFrame++;
          else this.currentFrame = 0;
    } //else {
        //this.elapsedFrames += deltaTime;
    //}

  }


}
