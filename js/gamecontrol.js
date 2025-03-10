//console.log(floorCollisions);
class GameControl {
    constructor(config) {
        this.element = config.element;
        this.canvas = canvasUV2;
        this.height = canvasUV2.height;
        this.width = canvasUV2.width;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.map = null;
        this.debug = true;

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
                  })
                )
              }
            });
        });

        //this.groundMargin = 0;
        this.input = new InputHandler(this);
        //this.sprite = new Sprite();

        this.player = new Player({
          game: this,
          collisionBlocks: this.collisionBlocks,
          platformCollisionBlocks: this.platformCollisionBlocks,
          imgsrc: './assets/img/Idle.png',
          frameRate :8,
          animations: {
            Idle: {
              imgsrc: './assets/img/Idle.png',
              frameRate :8,
              frameBuffer: 3
            },
            IdleLeft: {
              imgsrc: './assets/img/IdleLeft.png',
              frameRate :8,
              frameBuffer: 3
            },
            Run: {
              imgsrc: './assets/img/Run.png',
              frameRate :8,
              frameBuffer: 3
            },
            RunLeft: {
              imgsrc: './assets/img/RunLeft.png',
              frameRate :8,
              frameBuffer: 3
            },
            Jump: {
              imgsrc: './assets/img/Jump.png',
              frameRate :2,
              frameBuffer: 3
            },
            JumpLeft: {
              imgsrc: './assets/img/JumpLeft.png',
              frameRate :2,
              frameBuffer: 3
            },
            Fall: {
              imgsrc: './assets/img/Fall.png',
              frameRate :2,
              frameBuffer: 3
            },
            FallLeft: {
              imgsrc: './assets/img/FallLeft.png',
              frameRate :2,
              frameBuffer: 3
            },
            Attack1: {
              imgsrc: './assets/img/Attack1.png',
              frameRate :4,
              frameBuffer: 10
            },
          }
        });
        this.background = new Sprite({
          position: {
            x: 0,
            y: 0
          },
          imgsrc: './assets/img/background.png',
          frameRate: 1
        })


        this.gameOver = false;
    }

    update(context) {
      context.save();
      //context.scale(4, 4);
      context.translate(0, -this.background.image.height + this.scaledCanvas.height);
      this.background.update(context);
      //this property must be between save and restore
      //to scale the collision blocks to the proper coordinates
      this.collisionBlocks.forEach((collBlock) => {
          collBlock.draw(context);
      });
      this.platformCollisionBlocks.forEach((platCollBlock) => {
          platCollBlock.draw(context);
      });
      this.player.update(this.input.keys, context);
      context.restore();



    }

    draw(context) {
      //this.player.draw(context);//No longer Needed -> draw method is called within update method //Tight coupling--bad design
    }

    startGameLoop(context) {
      const animate = () => {
        context.clearRect(0, 0, this.width, this.height);
        this.update(context);//Update method must be called before draw method
        this.draw(context);
        if(!this.gameOver) requestAnimationFrame(animate);
      }
      animate(0);
    }

    init() {
      this.startGameLoop(this.ctx);
    }



}
