//console.log(floorCollisions);
const backgroundImageHeight = 432;
const scaledCanvas = {
  width: canvasUV2.width / 4,
  height: canvasUV2.height / 4
}
//console.log(canvasUV2.width / 4);
//backgroundImageHeight + scaledCanvas.height
const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height
  }
}

class GameControl {
    constructor(config) {
        this.element = config.element;
        this.canvas = canvasUV2;
        this.height = canvasUV2.height;
        this.width = canvasUV2.width;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.map = null;
        this.debug = true;

        this.speed = 0;
        this.maxSpeed = 3;

        this.scaledCanvas = {
          width: this.width / 4,
          height: this.height / 4
        }

        //Floor
        this.floorCollisions2D = [];
        for(let i = 0; i < floorCollisions.length; i += 36) {
          this.floorCollisions2D.push(floorCollisions.slice(i, i + 36));
        }

        this.collisionBlocks = [];
        this.floorCollisions2D.forEach((row, yi) => {
            row.forEach((symbol, xi) => {
              if(symbol == 202) {
                this.collisionBlocks.push(new CollisionBlock({position: {
                      x: xi * 16,
                      y: yi * 16
                    },
                  })
                )
              }
            });
        });

        //Platforms
        this.platformCollisions2D = [];
        for(let i = 0; i < platformCollisions.length; i += 36) {
          this.platformCollisions2D.push(platformCollisions.slice(i, i + 36));
        }

        this.platformCollisionBlocks = [];
        this.platformCollisions2D.forEach((row, yi) => {
            row.forEach((symbol, xi) => {
              if(symbol == 202) {
                this.platformCollisionBlocks.push(new CollisionBlock({position: {
                      x: xi * 16,
                      y: yi * 16
                    },
                    blockHeight: 4
                  })
                )
              }
            });
        });

        //this.groundMargin = 0;
        this.input = new InputHandler(this);
        this.particles = [];
        this.maxParticles = 100;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;

        this.enemyCollisions = [];
        // this.enemy = new Enemy({
        //   game: this,
        //
        // })
        this.player = new Player({
          game: this,
          collisionBlocks: this.collisionBlocks,
          platformCollisionBlocks: this.platformCollisionBlocks,
          imgsrc: './assets/img/Idle.png',
          frameY: 0,
          maxFrame: 7,
          frameCount :8,
          animations: {
            StandingRight: {
              imgsrc: './assets/img/Idle.png',
              maxFrame :7,
              frameCount :8,
              frameBuffer: 4
            },
            StandingLeft: {
              imgsrc: './assets/img/IdleLeft.png',
              maxFrame :7,
              frameCount :8,
              frameBuffer: 4
            },
            RunningRight: {
              imgsrc: './assets/img/Run.png',
              maxFrame :7,
              frameCount :8,
              frameBuffer: 3
            },
            RunningLeft: {
              imgsrc: './assets/img/RunLeft.png',
              maxFrame :7,
              frameCount :8,
              frameBuffer: 3
            },
            JumpingRight: {
              imgsrc: './assets/img/Jump.png',
              maxFrame :1,
              frameCount :2,
              frameBuffer: 3
            },
            JumpingLeft: {
              imgsrc: './assets/img/JumpLeft.png',
              maxFrame :1,
              frameCount :2,
              frameBuffer: 3
            },
            DoubleJumpingRight: {
              imgsrc: './assets/img/Jump.png',
              maxFrame :1,
              frameCount :2,
              frameBuffer: 3
            },
            DoubleJumpingLeft: {
              imgsrc: './assets/img/JumpLeft.png',
              maxFrame :1,
              frameCount :2,
              frameBuffer: 3
            },
            FallingRight: {
              imgsrc: './assets/img/Fall.png',
              maxFrame :1,
              frameCount :2,
              frameBuffer: 3
            },
            FallingLeft: {
              imgsrc: './assets/img/FallLeft.png',
              maxFrame :1,
              frameCount :2,
              frameBuffer: 3
            },
            TakeHit: {
              imgsrc: './assets/img/TakeHit.png',
              maxFrame :3,
              frameCount :4,
              frameBuffer: 4
            },
            SpeedBoostRight: {
              imgsrc: './assets/img/Run.png',
              maxFrame: 4,
              frameCount :5,
              frameBuffer: 3
            },
            SpeedBoostLeft: {
              imgsrc: './assets/img/RunLeft.png',
              maxFrame: 4,
              frameCount :5,
              frameBuffer: 3
            },
            Attack1: {
              imgsrc: './assets/img/Attack1.png',
              maxFrame :3,
              frameCount :4,
              frameBuffer: 4
            },
            Attack1Left: {
              imgsrc: './assets/img/Attack1.png',
              frameCount :4,
              frameBuffer: 4
            },
            Attack2: {
              imgsrc: './assets/img/Attack2.png',
              frameCount :4,
              frameBuffer: 4
            },
            Attack3: {
              imgsrc: './assets/img/Attack3.png',
              frameCount :4,
              frameBuffer: 4
            },
          },
          cameraPos: this.camera
        });

        // this.player.currentState = this.player.playerStates[1];
        // this.player.currentState.enter();

        this.lastTime = 0;

        this.background = new Sprite({
          position: {
            x: 0,
            y: 0
          },
          imgsrc: './assets/img/background.png',
          frameY: 0,
          maxFrame: 0,
          frameCount: 1

        })

        //Made camera global for now
        // this.camera = {
        //   position: {
        //     x: 0,
        //     y: 0
        //   }
        // }


        this.gameOver = false;
    }

    update(context, deltaTime) {
      //console.log(this.input.keys);
      //console.log(this.player.currentState)
      context.save();

      context.scale(4, 4);
      context.translate(camera.position.x, camera.position.y);//-this.background.image.height + this.scaledCanvas.height

      this.background.update(context, deltaTime);
      //this property must be between save and restore
      //to scale the collision blocks to the proper coordinates
      this.collisionBlocks.forEach((collBlock) => {
          collBlock.draw(context);
      });
      this.platformCollisionBlocks.forEach((platCollBlock) => {
          platCollBlock.draw(context);
      });
      this.player.checkHorizontalCanvasHitboxCollision();
      this.player.update(this.input.keys, context, deltaTime);
      //this.player.update(this.input.lastKey, context, deltaTime);//Last Key input event
      this.enemies.forEach(enemy => {
          enemy.draw(context);
      });

      //Draw Collision Sprites
      this.enemyCollisions.forEach(enemyCollision => {
          enemyCollision.draw(context);
      });

      //Enemy handler
      if(this.enemyTimer > this.enemyInterval) {
          this.addEnemy();
          this.enemyTimer = 0;
      } else {
          this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
          enemy.update(deltaTime);
          if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });

      //Handle Collision Sprites
      this.enemyCollisions.forEach((enemyCollision, index) => {
          enemyCollision.update(deltaTime);
          if(enemyCollision.markedForDeletion) this.enemyCollisions.splice(index, 1);
      });


      context.restore();

    }

    draw(context, deltaTime) {
      //this.player.draw(context);//No longer Needed -> draw method is called within update method //Tight coupling--bad design
    }

    startGameLoop(context) {
      const animate = (timeStamp) => {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        context.clearRect(0, 0, this.width, this.height);
        this.update(context, deltaTime);//Update method must be called before draw method
        this.draw(context);
        if(!this.gameOver) requestAnimationFrame(animate);
        //console.log(deltaTime);
      }
      animate(0);
    }

    addEnemy() {
        //Only want to add plant ground chaacters when the game is moving
        //Otherwise they would just be accumulating off screen
        //if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        //else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
        //console.log(this.enemies);
        this.enemies.push(new AerialEnemy(this, './assets/img/enemy_fly.png'));
        // this.enemies.push(
        //   new AerialEnemy({
        //     game: this,
        //     imgsrc: './assets/img/enemy_fly.png',
        //     frameCount :6,
        //     frameBuffer: 4
        //   })
        // );
    }

    init() {
      this.startGameLoop(this.ctx);
    }



}
