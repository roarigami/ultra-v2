
class InputHandler {
    constructor(game) {
      this.game = game;
      this.keys = [];
      window.addEventListener('keydown', (e) => {
          if((  e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key == 'ArrowLeft' ||
                e.key == 'ArrowRight' ||
                //e.key == 'Enter' ||
                //'s' for speed
                e.key == 's' ||
                e.key == 'a') &&
                this.keys.indexOf(e.key) === -1) {
              this.keys.push(e.key);
          } else if(e.key === 'd') this.game.debug = !this.game.debug;
          //console.log(e.key);

          //Restart the game
          if(e.key === 'Enter' && this.game.gameOver) this.game.restartGame();

      });
      window.addEventListener('keyup', (e) => {
          //console.log(e.key);
          if(  e.key === 'ArrowDown' ||
               e.key === 'ArrowUp' ||
               e.key == 'ArrowLeft' ||
               e.key == 'ArrowRight' ||
               //e.key == 'Enter' ||
               //'s' for speed
               e.key == 's' ||
               e.key == 'a') {
              this.keys.splice(this.keys.indexOf(e.key), 1);
          }
          //console.log(this.keys);
      });
    }
}
