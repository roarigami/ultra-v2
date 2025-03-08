
class GameControl {
    constructor(config) {
        this.element = config.element;
        this.canvas = canvasUV2;
        this.height = canvasUV2.height;
        this.width = canvasUV2.width;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.map = null;

        this.groundMargin = 0;

        this.player = new Player(this);
        this.input = new InputHandler(this);


        this.gameOver = false;
    }

    update() {
      this.player.update(this.input.keys);
    }

    draw(context) {
      this.player.draw(context);//Needed -> draw method is no longer called within update method
    }

    startGameLoop(context) {
      const animate = () => {
        context.clearRect(0, 0, this.width, this.height);
        this.draw(context);
        this.update();
        if(!this.gameOver) requestAnimationFrame(animate);
      }
      animate(0);
    }

    init() {
      this.startGameLoop(this.ctx);
    }



}
