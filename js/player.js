
class Player extends Sprite {
  constructor({game, collisionBlocks, platformCollisionBlocks, imgsrc, frameCount, scale = 0.5, animations, cameraPos}) {
    super({imgsrc, frameCount, scale});
    this.game = game;
    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.cameraPos = cameraPos;
    //this.width = 100 / 4;//height and width set in Sprite class
    //this.height = 100 / 4;//height and width set in Sprite class

    this.gravity = 0.01;
    this.bounce = 5;
    this.maxBounce = 10;

    this.isAttacking;
    this.isAttacking2;
    this.isAttacking3;

    this.position = {
      x: -10,
      y: 300//this.game.height - this.height
    }
    this.velocity = {
      x: 0,
      y: 0
    }

    this.speedLevelOne = 0.15;
    this.speedLevelTwo = 2.25;
    this.speedLevelThree = 2,5;
    this.speedLevelFour = 2.75;
    this.speedLevelFive = 3;
    this.speedBoostLevelOne = 1;
    this.speedBoostLevelTwo = 2;
    this.speedBoostLevelThree = 3;

    this.speed = this.velocity.x + this.speedLevelOne;


    this.hitbox = {
          position: {
            x: this.position.x + 31.5,
            y: this.position.y + 25
          },
          width: 18,
          height: 28
    }

    this.attackbox = {
      position: {
        x: this.hitbox.position.x,
        y: this.hitbox.position.y
      },
      width: 70,
      height: 5
    }
    this.attackbox2 = {
      position: {
        x: this.hitbox.position.x,
        y: this.hitbox.position.y
      },
      width: 48,
      height: 20
    }
    this.attackbox3 = {
      position: {
        x: this.hitbox.position.x,
        y: this.hitbox.position.y
      },
      width: 70,
      height: 5
    }


    this.camerabox = {
        position: {
          x: this.position.x - 50,
          y: this.position.y
        },
        width: 200,
        height: 80
    }

    this.lastDirection = 'right';
    this.animations = animations;
    for(let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imgsrc;

        this.animations[key].image = image;
    }

    this.playerStates = [new StandingLeft(this.game), new StandingRight(this.game),
                         //new CrouchingLeft(this.game), new CrouchingRight(this.game),
                         new RunningLeft(this.game), new RunningRight(this.game),
                         new JumpingLeft(this.game), new JumpingRight(this.game),
                         new FallingLeft(this.game), new FallingRight(this.game)];
    this.currentState = this.playerStates[1];


  }

  panCameraLeft(deltaTime) {
    const cameraboxRightEdge = this.camerabox.position.x + this.camerabox.width;
    const canvasWidthScaled = canvasUV2.width / 4;

    if(cameraboxRightEdge >= 576) return
    if(cameraboxRightEdge >= canvasWidthScaled + Math.abs(camera.position.x)) {
      //console.log(this.cameraPos);
      camera.position.x -= this.velocity.x * deltaTime;
    }
  }

  panCameraRight(deltaTime) {
    const cameraboxLeftEdge = this.camerabox.position.x;
    if(cameraboxLeftEdge <= 0) return
    if(cameraboxLeftEdge <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x * deltaTime;
    }

  }

  panCameraDown() {
    //const cameraboxTopEdge = this.camerabox.position.y;
    if(this.camerabox.position.y + this.velocity.y <= 0) return

    if(this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  panCameraUp() {
    //const cameraboxTopEdge = this.camerabox.position.y;
    if(this.camerabox.position.y + this.camerabox.height + this.velocity.y >= backgroundImageHeight) return

    if(this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + scaledCanvas.height) {
      camera.position.y -= this.velocity.y;
    }
  }

  checkHorizontalCanvasHitboxCollision() {
    if(this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
       this.hitbox.position.x + this.velocity.x <= 0) {
      this.velocity.x = 0;
    }
  }

  playerState(key) {
    //console.log(key)
    //If last key is equal to arrowUp return
    if(this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameCount = this.animations[key].frameCount;
  }

  update(input, context, deltaTime) {
    //console.log(this.frameTimer)
    //console.log(this.velocity.x)
    this.position.x += this.velocity.x * deltaTime;
    this.hitbox.x += this.velocity.x * deltaTime;

    //Sprite class method
    this.checkEnemyCollision();
    this.updateFrames();
    this.updateHitbox();

    this.updateAttackbox();
    this.updateCamerabox();

    this.applyGravity(deltaTime);
    //this.updateHitbox();


    this.playerDraw(context, deltaTime);
    this.draw(context, deltaTime);

    //this.updateHorizontalPosition(deltaTime);
    this.checkHorizontalCollision();

    this.updateHitbox();//Hitbox must be right here //bad design

    //this.updateVerticalPosition(deltaTime);
    this.checkVerticalCollision(input);
    //console.log(this.checkVerticalCollision());

    //console.log(input);

    //Inputs
    if(input.includes('a')){
    //if(input === 'PRESS a')
        this.playerState('Attack1');
        this.playerAttack();

    } else if(input.includes('z')){
    //if(input === 'PRESS a')
        this.playerState('Attack2');
        this.playerAttackTwo();

    }  else if(input.includes('x')){
    //if(input === 'PRESS a')
        this.playerState('Attack3');
        this.playerAttackThree();

    } else if(input.includes('ArrowRight')){
    // if(input === 'PRESS right') {
      this.playerState('RunningRight');
      this.velocity.x = this.speed;
      this.lastDirection = 'right';
      this.panCameraLeft(deltaTime);

    } else if(input.includes('ArrowLeft')) {
            //if(input === 'PRESS left') {
        //console.log('RUNNING LEFT')
        this.playerState('RunningLeft');
        this.velocity.x = -this.speed;
        this.lastDirection = 'left';
        this.panCameraRight(deltaTime);

    } else if(this.velocity.y === 0) {

      if(this.lastDirection === 'right') this.playerState('StandingRight');
      else if(this.lastDirection === 'left') this.playerState('StandingLeft');
      this.velocity.x = 0;

    }

    if(input.includes('ArrowUp')){
    //if(input === 'PRESS up')
      //this.updateHitbox();
      //if(this.onGround())
      this.playerJump();
      this.panCameraDown();
    }
    //console.log(this.speed);
    if(input.includes('s')){
    //if(input === 'PRESS s')
      this.playerSpeedBoost();
      //if(this.lastDirection === 'right') this.playerState('SpeedBoostRight');
      //else if(this.lastDirection === 'left') this.playerState('SpeedBoostLeft');
    }

    if(this.velocity.y < 0) {
      this.panCameraDown();
      //if(input.includes('Attack1')) {
        if(this.lastDirection === 'right') this.playerState('JumpingRight');
        else if(this.lastDirection === 'left') this.playerState('JumpingLeft');
      //}

    }
    else if(this.velocity.y > 0) {

      if(this.lastDirection === 'right') this.playerState('FallingRight');
      else if(this.lastDirection === 'left') this.playerState('FallingLeft');
      this.panCameraUp();
    }

    //Horizontal Boundaries
    // const offsetLeft = this.hitbox.position.x - this.position.x;
    // if(this.hitbox.position.x < 0) this.hitbox.position.x = 0;
    // if(this.hitbox.position.x > this.game.width - this.width) this.hitbox.position.x = this.game.width - this.width;

  }

  playerClasstest() {
    console.log("This is the player class access test. WORKING!")
  }
  playerHit() {
    this.playerState('TakeHit');
  }

  playerSpeedBoost() {
    this.speed = this.speed + this.speedBoostLevelOne;
    setTimeout(() => {
      this.speed = 2;
    }, 100);
  }

  playerAttack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 225);
  }
  playerAttackTwo() {
    this.isAttacking2 = true;
    setTimeout(() => {
      this.isAttacking2 = false;
    }, 225);
  }
  playerAttackThree() {
    this.isAttacking3 = true;
    setTimeout(() => {
      this.isAttacking3 = false;
    }, 225);
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

  updateAttackbox() {
    this.attackbox = {
      position: {
        x: this.hitbox.position.x,
        y: this.hitbox.position.y + 10
      },
      width: 45,
      height: 10
    }
    this.attackbox2 = {
      position: {
        x: this.hitbox.position.x - 25,
        y: this.hitbox.position.y - 3
      },
      width: 73,
      height: 30
    }
    this.attackbox3 = {
      position: {
        x: this.hitbox.position.x - 19,
        y: this.hitbox.position.y - 25
      },
      width: 65,
      height: 53
    }
  }

  updateCamerabox() {
    this.camerabox = {
        position: {
          x: this.position.x - 58,
          y: this.position.y
        },
        width: 200,
        height: 80
    }
  }


  playerDraw(context, deltaTime) {
    if(this.game.debug) {
      //Image box
      context.fillStyle = 'rgba(0, 0, 0, 0.575)';
      context.fillRect(this.position.x, this.position.y, this.width, this.height);

      //Hit box
      context.fillStyle = 'rgba(15, 255, 0, 0.575)';
      context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

      //Attack1 box
      if(this.isAttacking == true) {
        context.fillStyle = 'rgba(255, 0, 0, 0.575)';
        context.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height);
      }

      //Attack3 box
      if(this.isAttacking2 == true) {
        context.fillStyle = 'rgba(255, 0, 0, 0.575)';
        context.fillRect(this.attackbox2.position.x, this.attackbox2.position.y, this.attackbox2.width, this.attackbox2.height);
      }

      //Attack3 box
      if(this.isAttacking3 == true) {
        context.fillStyle = 'rgba(255, 0, 0, 0.575)';
        context.fillRect(this.attackbox3.position.x, this.attackbox3.position.y, this.attackbox3.width, this.attackbox3.height);
      }

      //Camera box
      context.fillStyle = 'rgba(0, 0, 255, 0.275)';
      context.fillRect(this.camerabox.position.x, this.camerabox.position.y, this.camerabox.width, this.camerabox.height);
    }
  }

  playerJump() {
    if(this.velocity.y === 0) {
      this.velocity.y = -this.bounce;
    }
  }

  updateHorizontalPosition(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.hitbox.x += this.velocity.x * deltaTime;
  }

  updateVerticalPosition(deltaTime) {
    this.position.y += this.velocity.y * deltaTime;
    this.hitbox.y += this.velocity.y * deltaTime;
  }

  applyGravity(deltaTime) {
    this.velocity.y += this.gravity * deltaTime;//This must be first
    this.position.y += this.velocity.y;
    this.hitbox.y += this.velocity.y;
  }
  onGround() {
      return this.velocity.y <= 0.2 && this.velocity.y >= 0;
  }

  setPlayerState(playerState) {
      //Make sure all methods that are using setPlayerState are passing all expected arguments otherwise it won't work
      this.currentState = this.playerStates[playerState];
      this.currentState.enter();
  }

  checkAttackCollision() {
      this.game.enemies.forEach(enemy => {
          if(this.attackbox.position.x + player.attackbox.width >= enemy.x &&
             this.attackbox.position.x <= enemy.x + enemy.width &&
             this.attackbox.position.y + player.attackbox.height >= enemy.y &&
             this.attackbox.position.y <= enemy.y + enemy.height &&
             this.isAttacking) {
               this.isAttacking = false;
          }
      });
  }

  checkHorizontalCollision() {
      const collisionBufferH = 0.0001;
      for(let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlockH = this.collisionBlocks[i];

          if(xyCollision({
                object1: this.hitbox,
                object2: collisionBlockH
              })
            ) {
              //console.log("colliding with wall");
              //console.log(this.velocity.x);
              //this.velocity.y = 0;
                if(this.velocity.x > 0) {

                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;

                    this.position.x = collisionBlockH.position.x - offset - collisionBufferH;
                    break;
                }
                if(this.velocity.x < 0) {

                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x;

                    this.position.x = collisionBlockH.position.x + collisionBlockH.width - offset + collisionBufferH;
                    break;
                }
          }
      }
  }

  checkVerticalCollision(input) {
    const collisionBufferV = 0.0001;
      for(let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlockH = this.collisionBlocks[i];

          if(xyCollision({
                object1: this.hitbox,
                object2: collisionBlockH
              })
            ) {
            //console.log("colliding with ground");
            //Cannot go through ground
                if(this.velocity.y > 0) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlockH.position.y - offset - collisionBufferV;
                    break;
                }
                //Cannot go through ceiling
                if(this.velocity.y < 0) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;

                    this.position.y = collisionBlockH.position.y + collisionBlockH.height - offset + collisionBufferV;
                    break;
                }
          }
      }

      //Platform Collisions
      for(let i = 0; i < this.platformCollisionBlocks.length; i++) {
          const platformCollisionBlock = this.platformCollisionBlocks[i];

          if(platformCollision({
                object1: this.hitbox,
                object2: platformCollisionBlock
              })
            ) {
            //console.log("colliding with platform");
            //Cannot go through platform floor
                if(this.velocity.y > 0 && !input.includes('ArrowDown')) {

                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = platformCollisionBlock.position.y - offset - 0.0001;
                    break;
                }

                //Can/Cannot go through platform bottom
                // if(this.velocity.y < 0) {
                //
                //     this.velocity.y = 0;
                //     const offset = this.hitbox.position.y - this.position.y;
                //
                //     //This line of code prevents player from travelling through the bottom of a platform
                //     this.position.y = platformCollisionBlock.position.y + platformCollisionBlock.height - offset + colissionBuffer;
                //     break;
                // }
          }
      }




  }

  checkEnemyCollision() {
    this.game.enemies.forEach(enemy => {
        if(enemy.x < this.hitbox.position.x + this.hitbox.width &&
        enemy.x + enemy.width > this.hitbox.position.x &&
        enemy.y < this.hitbox.position.y + this.hitbox.height &&
        enemy.y + enemy.height > this.hitbox.position.y) {
          //collision detected

          console.log("Collided with enemy");

          enemy.markedForDeletion = true;
          this.game.enemyCollisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5,
                                                           enemy.y + enemy.height * 0.5));

          // if( this.currentState === this.playerStates[4] ||
          //     this.currentState === this.playerStates[5]) {
          //       this.game.score++;
          // } else {
          //     this.setState(6, 0);
          //     this.game.lives--;

              //Will set gameOver to true in Knockout Class
              //if(this.game.lives <= 0) this.game.gameOver = true;
              //if(this.game.lives <= 0) this.setState(8, 0);
          //}

        }
        // else {
        //   //no collision
        // }
    });
  }

}
