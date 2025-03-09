//console.log(floorCollisions);
class GameControl {
    constructor(config) {
        this.element = config.element;
        this.canvas = canvasUV2;
        this.height = canvasUV2.height;
        this.width = canvasUV2.width;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.map = null;
        this.scaledCanvas = {
          width: this.width / 4,
          height: this.height / 4
        }
        this.floorCollisions2D = [];
        for(let i = 0; i < floorCollisions.length; i += 36) {
          this.floorCollisions2D.push(floorCollisions.slice(i, i + 36));
        }
        this.floorCollisions2D.forEach((row, i) => {
            row.forEach((symbol, i) => {
              if(symbol == 202) {
                
              }
            });

        });

        //console.log(this.floorCollisions2D);

        this.groundMargin = 0;

        this.player = new Player(this);
        this.input = new InputHandler(this);
        //this.sprite = new Sprite();
        this.background = new Sprite({
          position: {
            x: 0,
            y: 0
          },
          imgsrc: './assets/img/background.png'
        })


        this.gameOver = false;
    }

    update(context) {
      this.player.update(this.input.keys);
      context.save();
      context.scale(4, 4);
      context.translate(0, -this.background.image.height + this.scaledCanvas.height);
      this.background.update(context);
      context.restore();
    }

    draw(context) {
      this.player.draw(context);//Needed -> draw method is no longer called within update method
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
