// class Enemy extends Sprite {
//     constructor(imgsrc, frameCount, scale = 0.5) {
//       super({imgsrc, frameCount, scale})
//       // this.frameX = 0;
//       // this.frameY = 0;
//       // this.fps = 20;
//       // this.frameInterval = 1000/this.fps;
//       // this.frameTimer = 0;
//       this.markedForDeletion = false;
//     }
//
//     update(deltaTime) {
//         //Movement
//         this.x -= this.speedX;
//         this.y += this.speedY;
//         //Sprite class method
//         this.updateFrames();
//
//
//         //Check if enemy has moved off screen
//         if(this.x + this.width < 0 ) this.markedForDeletion = true;
//     }
//
//     draw(context) {
//       if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
//       context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
//         this.x, this.y, this.width, this.height);
//     }
// }

class Enemy {
    constructor() {
      this.frameX = 0;
      this.frameY = 0;
      this.fps = 20;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;
      this.markedForDeletion = false;
    }

    update(deltaTime) {
        //Movement
        this.x -= this.speedX;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        //Check if enemy has moved off screen
        if(this.x + this.width < 0 ) this.markedForDeletion = true;
    }

    draw(context) {
      if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
      //console.log(this.image.width);
      context.drawImage(this.image,
                        this.frameX * this.width,
                        0,
                        this.width,
                        this.height,
                        this.x,
                        this.y,
                        this.width,
                        this.iwidth);
    }
}

class AerialEnemy extends Enemy {
    // constructor({game, imgsrc, frameCount, frameBuffer}) {
    //   super({imgsrc, frameCount, frameBuffer});
    constructor(game, imgsrc) {
      super();
      this.game = game;
      this.scale = 0.25;
      this.loaded = true;

      this.width = 15;
      this.height = 11;
      this.x = this.game.width + Math.random() * this.game.width * 0.5;
      this.y = Math.random() * this.game.height * 0.5;
      this.speedX = Math.random() + 1;
      this.speedY = 0;
      this.maxFrame = 5;
      this.frameCount = 6;

      this.image = new Image();
      //this.image = enemyAir;
      this.image.onload = () => {
          this.image.width = (this.image.width / this.frameCount) * this.scale;
          this.image.height =  (this.image.height) * this.scale;
          this.loaded = true;
          console.log(this.image.width);
      }
      this.image.src = imgsrc;

      //console.log(this.image.width);
      //console.log(this.image.height);
      //console.log(this.width);
      //console.log(this.height);

      //Wavy up and down movement
      this.angle = 0;
      this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
        //this.x += Math.cos(this.angle);
    }
}

// class GroundEnemy extends Enemy {
//     constructor(game) {
//       super();
//       this.game = game;
//       this.width = 60;
//       this.height = 87;
//       this.x = this.game.width;
//       this.y = this.game.height - this.height - this.game.groundMargin;
//       this.image = enemyGround;
//       this.speedX = 0;
//       this.speedY = 0;
//       this.maxFrame = 1;
//       //console.log(this.y);
//     }
// }
//
// class ClimbingEnemy extends Enemy {
//     constructor(game) {
//       super();
//       this.game= game;
//       this.width = 120;
//       this.height = 144;
//       this.x = this.game.width;
//       this.y = Math.random() * this.game.height * 0.5;
//       this.speedX = 0;
//       this.speedY = Math.random() > 0.5 ? 1 : -1;
//       this.maxFrame = 5;
//       this.image = enemyClimb;
//     }
//
//     update(deltaTime) {
//         super.update(deltaTime);
//         if(this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
//         if(this.y < -this.height) this.markedForDeletion = true;
//     }
//
//     draw(context) {
//         super.draw(context);
//         context.beginPath();
//         context.moveTo(this.x + this.width/2, 0);
//         context.lineTo(this.x + this.width/2, this.y + 50);
//         context.stroke();
//
//     }
// }
