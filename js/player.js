class Player extends Sprite {
  constructor({game, collisionBlocks, imgsrc, frameRate, scale = 0.5}) {
    super({imgsrc, frameRate, scale});
    this.game = game;
    this.collisionBlocks = collisionBlocks;
    //this.width = 100 / 4;//height and width set in Sprite class
    //this.height = 100 / 4;//height and width set in Sprite class

    this.gravity = 2;
    this.speed = 2;
    this.maxSpeed = 20;
    this.bounce = 3;
    this.maxBounce = 10;

    this.position = {
      x: 100,
      y: 200//this.game.height - this.height
    }
    this.velocity = {
      x: 0,
      y: 1
    }

    this.image = Idle;
    this.frameX = 0;
    this.frameY = 0;

  }

  update(input, context) {
    this.updateFrames();
    //console.log(this.velocity.x);
    //console.log(this.velocity.y);
    context.fillStyle = 'rgba(255, 0, 0, 1)';
    context.strokeRect(this.position.x, this.position.y, this.width, this.height);

    this.position.x += this.velocity.x;
    this.draw(context);
    //console.log(this.velocity.x);
    this.checkHorizontalCollision();
    this.applyGravity();
    this.checkVerticalCollision();

    //Inputs
    if(input.includes('ArrowRight')) this.velocity.x = this.speed;
    else if(input.includes('ArrowLeft')) this.velocity.x = -this.speed;
      else this.velocity.x = 0;
    if(input.includes('ArrowUp')) this.velocity.y -= this.bounce;

    //Horizontal Boundaries
    // if(this.position.x < 0) this.position.x = 0;
    // if(this.position.x > this.game.width - this.width) this.position.x = this.game.width - this.width;

  }

  // draw(context) {
  //   context.fillStyle = "red";
  //   context.fillRect(this.position.x, this.position.y, this.width, this.height);
  //   // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x, this.position.y,
  //   // this.width, this.height);
  // }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;
  }
  onGround() {
      return this.position.y >= this.game.height - this.height - this.game.groundMargin;
  }

  checkHorizontalCollision() {
      for(let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i];

          if(xyCollision({
                object1: this,
                object2: collisionBlock
              })
            ) {
              //console.log("colliding with wall");
                if(this.velocity.x > 0) {
                    this.velocity.x = 0;
                    //this.speed = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
                if(this.velocity.x < 0) {
                    this.velocity.x = 0;
                    //this.speed = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
          }
      }
  }

  checkVerticalCollision() {
      for(let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i];

          if(xyCollision({
                object1: this,
                object2: collisionBlock
              })
            ) {
            //console.log("colliding with ground");
            //Cannot go through ground
                if(this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
                //Cannot go through ceiling
                if(this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }
          }
      }
  }

  checkEnemyCollision() {

  }

}
