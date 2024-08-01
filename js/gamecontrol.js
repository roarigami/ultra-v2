class GameControl {
    constructor(config) {
        this.element = config.element;
        this.canvas = canvasUV2;
        this.height = canvasUV2.height;
        this.width = canvasUV2.width;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.map = null;

        this.y = 100;
    }

    startGameLoop(context) {
      const animate = () => {
        context.clearRect(0, 0, this.width, this.height);
        context.fillRect(200, this.y, 100, 100);
        requestAnimationFrame(animate);
        this.y++;
      }
      animate(0);
    }

    init() {
      this.startGameLoop(this.ctx);
    }



}
