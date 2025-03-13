class CollisionAnimation {
    constructor(game, x, y) {
      this.game = game;
      this.image = collisionAnimation;
      this.spriteWidth = 100;
      this.spriteHeight = 90;
      this.sizeModifier = Math.random() + 0.5;
      this.width = this.spriteWidth * this.sizeModifier;
      this.height = this.spriteHeight * this.sizeModifier;
      this.x = x - this.width * 0.5;
      this.y = y - this.height * 0.5;
      this.frameX = 0;
      this.maxFrame = 4;
      this.markedForDeletion = false;

      // this.fps = Math.random() * 10 + 5;
      this.fps = 15;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;

      this.soundAttack = new Audio();
      this.soundAttack.src = 'assets/sound/fireImpact.wav';
      this.soundDamage = new Audio();
      this.soundDamage.src = 'assets/sound/iceBoom.wav';
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
          this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
      this.x -= this.game.speed;

      if(this.frameTimer > this.frameInterval) {
          this.frameX++;
          this.frameTimer = 0;
      } else {
          this.frameTimer += deltaTime;
      }
      if(this.frameX > this.maxFrame ) this.markedForDeletion = true;

      //Check if player is rolling or diving to play attack collision sound
      //If player is in any other state play damage collision sound
      if( this.game.player.currentState === this.game.player.playerStates[4] ||
          this.game.player.currentState === this.game.player.playerStates[5]) {

            //Only want to play sound once per animation
            if(this.frameX === 0) this.soundAttack.play();
            this.frameTimer++;
            if(this.frameTimer % this.fps === 0) {
                this.frameX++;
            }

      } else {

        //Only want to play sound once per animation
        if(this.frameX === 0) this.soundDamage.play();
        this.frameTimer++;
        if(this.frameTimer % this.fps === 0) {
            this.frameX++;
        }

      }
    }

}
