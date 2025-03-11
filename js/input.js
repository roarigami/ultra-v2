
class InputHandler {
    constructor(game) {
      this.game = game;
      this.keys = [];

      window.addEventListener('keydown', (e) => {
          // if((  e.key === 'ArrowDown' ||
          //       e.key === 'ArrowUp' ||
          //       e.key == 'ArrowLeft' ||
          //       e.key == 'ArrowRight' ||
          //       //e.key == 'Enter' ||
          //       //'s' for speed
          //       e.key == 's' ||
          //       e.key == 'a') &&
          //       this.keys.indexOf(e.key) === -1) {
          //     this.keys.push(e.key);
          // } else if(e.key === 'd') this.game.debug = !this.game.debug;
          // //console.log(e.key);

          switch(e.key){
              case "ArrowLeft":
                  this.lastKey = "PRESS left";
                  this.keys.push(e.key)
                  break
              case "ArrowRight":
                  this.lastKey = "PRESS right";
                  this.keys.push(e.key)
                  break
              case "ArrowDown":
                  this.lastKey = "PRESS down";
                  this.keys.push(e.key)
                  break
              case "ArrowUp":
                  this.lastKey = "PRESS up";
                  this.keys.push(e.key)
                  break

              case "s":
                  this.lastKey = "PRESS s";
                  this.keys.push(e.key)
                  break

              case "a":
                  this.lastKey = "PRESS a";
                  this.keys.push(e.key)
                  break

              case "d":
                  this.lastKey = "PRESS d";
                  this.game.debug = !this.game.debug;
                  this.keys.push(e.key)
                  break
          }

          //Restart the game
          if(e.key === 'Enter' && this.game.gameOver) this.game.restartGame();

      });
      window.addEventListener('keyup', (e) => {
          //console.log(e.key);
          // if(  e.key === 'ArrowDown' ||
          //      e.key === 'ArrowUp' ||
          //      e.key == 'ArrowLeft' ||
          //      e.key == 'ArrowRight' ||
          //      //e.key == 'Enter' ||
          //      //'s' for speed
          //      e.key == 's' ||
          //      e.key == 'a') {
          //     this.keys.splice(this.keys.indexOf(e.key), 1);
          // }
          switch(e.key){
              case "ArrowLeft":
                  this.lastKey = "RELEASE left";
                  this.keys.splice(this.keys.indexOf(e.key), 1);
                  break
              case "ArrowRight":
                  this.lastKey = "RELEASE right";
                  this.keys.splice(this.keys.indexOf(e.key), 1);
                  break
              case "ArrowDown":
                  this.lastKey = "RELEASE down";
                  this.keys.splice(this.keys.indexOf(e.key), 1);
                  break
              case "ArrowUp":
                  this.lastKey = "RELEASE up";
                  this.keys.splice(this.keys.indexOf(e.key), 1);
                  break
              case "s":
                  this.lastKey = "RELEASE s";
                  this.keys.splice(this.keys.indexOf(e.key), 1);
                  break
              case "a":
                  this.lastKey = "RELEASE a";
                  this.keys.splice(this.keys.indexOf(e.key), 1);
                  break
          }
          //console.log(this.keys);
      });
    }
}
