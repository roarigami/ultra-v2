class Player extends Sprite {
  constructor({game, collisionBlocks, platformCollisionBlocks, imgsrc, frameRate, scale = 0.5, animations}) {
    super({imgsrc, frameRate, scale});
    this.game = game;
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    //this.width = 100 / 4;//height and width set in Sprite class
    //this.height = 100 / 4;//height and width set in Sprite class
    this.gravity = 2;
    this.speed = 2;
    this.maxSpeed = 10;
    this.bounce = 3;
    this.maxBounce = 10;

    this.lastDirection = 'right';
    this.animations = animations;
    for(let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imgsrc;

        this.animations[key].image = image;
    }

    this.position = {
      x: 100,
      y: 200//this.game.height - this.height
    }
    this.velocity = {
      x: 0,
      y: 1
    }

    this.hitbox = {
          position: {
            x: this.position.x + 31.5,
            y: this.position.y + 25
          },
          width: 18,
          height: 28
    }

    this.image = Idle;
    this.frameX = 0;
    this.frameY = 0;

  }

  switchSprite(key) {
    //console.log(key)
    if(this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update(input, context) {
    this.updateFrames();
    this.updateHitbox();
    //console.log(this.velocity.x);
    //console.log(this.velocity.y);
    if(this.game.debug) {
      context.fillStyle = 'rgba(0, 0, 0, 0.575)';
      context.fillRect(this.position.x, this.position.y, this.width, this.height);

      context.fillStyle = 'rgba(255, 0, 0, 0.575)';
      context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
    }



    this.position.x += this.velocity.x;
    this.draw(context);

    this.checkHorizontalCollision();

    //if(!this.onGround()) this.applyGravity();
    //else this.velocity.y = 0;
    this.applyGravity();

    this.updateHitbox();//Hitbox must be right here //bad design
    this.checkVerticalCollision();

    //Inputs
    if(input.includes('ArrowRight')) {
      this.switchSprite('Run');
      this.velocity.x = this.speed;
      this.lastDirection = 'right';
    } else if(input.includes('ArrowLeft')) {
      this.switchSprite('RunLeft');
        this.velocity.x = -this.speed;
        this.lastDirection = 'left';
    } else if(this.velocity.y === 0) {
      if(this.lastDirection === 'right') this.switchSprite('Idle');
      else if(this.lastDirection === 'left') this.switchSprite('IdleLeft');
      this.velocity.x = 0;
    }

    if(input.includes('ArrowUp')) {
      this.velocity.y -= this.bounce;
    }
    if(input.includes('s')) {
        //this.speed = this.maxSpeed;
    }
    if(input.includes('a')) {
        this.switchSprite('Attack1');
    }
    if(this.velocity.y < 0) {
      if(this.lastDirection === 'right') this.switchSprite('Jump');
      else if(this.lastDirection === 'left') this.switchSprite('JumpLeft');
    }
    else if(this.velocity.y > 0) {
      if(this.lastDirection === 'right') this.switchSprite('Fall');
      else if(this.lastDirection === 'left') this.switchSprite('FallLeft');
    }

    //Horizontal Boundaries
    // const offsetLeft = this.hitbox.position.x - this.position.x;
    // if(this.hitbox.position.x < 0) this.hitbox.position.x = 0;
    // if(this.hitbox.position.x > this.game.width - this.width) this.hitbox.position.x = this.game.width - this.width;

  }

  updateHitbox() {
    this.hitbox = {
          position: {
            x: this.position.x + 31.5,
            y: this.position.y + 25
          },
          width: 18,
          height: 28
    }
  }

  // draw(context) {
  //   context.fillStyle = "red";
  //   context.fillRect(this.position.x, this.position.y, this.width, this.height);
  //   // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x, this.position.y,
  //   // this.width, this.height);
  // }

  applyGravity() {
    this.velocity.y += this.gravity;//This must be first
    this.position.y += this.velocity.y;
  }
  onGround() {
      return this.velocity.y == 0;
  }

  checkHorizontalCollision() {
      for(let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i];

          if(xyCollision({
                object1: this.hitbox,
                object2: collisionBlock
              })
            ) {
              //console.log("colliding with wall");
              //console.log(this.velocity.x);
              //this.velocity.y = 0;
                if(this.velocity.x > 0) {

                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;

                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
                if(this.velocity.x < 0) {

                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
          }
      }
  }

  checkVerticalCollision() {
      for(let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i];

          if(xyCollision({
                object1: this.hitbox,
                object2: collisionBlock
              })
            ) {
            //console.log("colliding with ground");
            //Cannot go through ground
                if(this.velocity.y > 0) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
                //Cannot go through ceiling
                if(this.velocity.y < 0) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
          }
      }

      //Platform Collisions
      for(let i = 0; i < this.platformCollisionBlocks.length; i++) {
          const platformCollisionBlock = this.platformCollisionBlocks[i];

          if(xyCollision({
                object1: this.hitbox,
                object2: platformCollisionBlock
              })
            ) {
            //console.log("colliding with platform");
            //Cannot go through platform floor
                if(this.velocity.y > 0) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }

                //Can/Cannot go through platform bottom
                if(this.velocity.y < 0) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;

                    this.position.y = platformCollisionBlock.position.y + platformCollisionBlock.height - offset + 0.01;
                    break;
                }
          }
      }




  }

  checkEnemyCollision() {

  }

}
