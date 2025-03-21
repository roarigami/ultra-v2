
class Sprite {
  constructor({position, imgsrc, frameY, maxFrame = 1, frameCount = 1, frameBuffer = 3, scale = 1}) {
    this.position = position;
    this.scale = scale;
    this.loaded = false;
    this.maxFrame = maxFrame;

    this.image = new Image();
    // this.frameCount = frameCount;
    // this.currentFrame = 0;
    // this.frameBuffer = frameBuffer;
    // this.elapsedFrames = 0;
    this.image.onload = () => {
        this.width = (this.image.width / this.frameCount) * this.scale;
        this.height = (this.image.height) * this.scale;
        this.loaded = true;
    }
    this.image.src = imgsrc;

    this.frameX = 0;
    this.frameY = frameY;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    //console.log(this.image);
  }



  update(context, deltaTime) {

    //if(this.currentFrame < this.frameCount - 1) this.currentFrame++;
    //else this.currentFrame = 0;

    // //Sprite animation
    // if(this.frameTimer > this.frameInterval) {
    //     this.frameTimer = 0;
    //     if(this.frameX < this.maxFrame) this.frameX++;
    //     else this.frameX = 0;
    // } else {
    //     this.frameTimer += deltaTime;
    // }
    //console.log(this.maxFrame);
    //console.log(this.currentFrame);

    //console.log(deltaTime)
    // this.draw(context);
    // this.updateFrames(deltaTime);

  }

  // draw(context) {
  //
  //   context.drawImage(this.image,
  //                     this.frameX * this.width,
  //                     0,
  //                     this.width,
  //                     this.height,
  //                     this.x,
  //                     this.y,
  //                     this.width,
  //                     this.width);
  //
  //
  // }

  draw(context) {
    //console.log(this.currentFrame);
    if(!this.image) return;

    const cropbox = {
      position: {
        x: this.frameX * (this.image.width / this.frameCount),
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

    // context.drawImage(this.image,
    //                   this.frameX * this.width,
    //                   this.frameY * this.height,
    //                   this.width,
    //                   this.height,
    //                   this.x,
    //                   this.y,
    //                   this.width,
    //                   this.height);
  }

  // updateFrames(deltaTime) {
  //
  //   //Sprite animation
  //   if(this.frameTimer > this.frameInterval) {
  //       this.frameTimer = 0;
  //       if(this.frameX < this.maxFrame) this.frameX++;
  //       else this.frameX = 0;
  //   } else {
  //       this.frameTimer += deltaTime;
  //   }
  //
  //   // this.elapsedFrames++;
  //   //
  //   // if(this.elapsedFrames % this.frameBuffer === 0) {
  //   //     if(this.currentFrame < this.frameCount - 1) this.currentFrame++;
  //   //       else this.currentFrame = 0;
  //   // } //else {
  //   //     //this.elapsedFrames += deltaTime;
  //   // //}
  //
  // }


}
