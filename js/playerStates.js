const playerStates = {
    IDLE: 0,
    ATTACKONE: 1,
    RUNLEFT: 2,
    RUNRIGHT: 3,
    JUMPLEFT: 4,
    JUMPRIGHT: 5
}

class PlayerState {
    constructor(playerState, game) {
        this.game = game;
        this.game.playerState = playerState;
    }
}

class IdleStand extends PlayerState {
  constructor(game) {
      super('IDLESTAND', game);
  }
  enter() {
    this.game.player.playerState('Idle');
    this.game.player.maxFrame = 3;
    console.log('Idle Stand');
  }
  handleInput(input) {
    if(input.includes('a')) {

      this.game.player.setState(playerStates.ATTACKONE, this.game.player.frameCount);

    } else if(input.includes('ArrowLeft')) {

        this.game.player.setState(playerStates.RUNLEFT, this.game.player.frameCount);

    } else if(input.includes('ArrowRight')) {

        this.game.player.setState(playerStates.RUNRIGHT, this.game.player.frameCount);

    }

  }

}

class AttackOne extends PlayerState {
    constructor(game) {
        super('ATTACKONE', game);
    }
    enter() {
      this.game.player.playerState('Attack1');
      this.game.player.maxFrame = 4;
      //console.log('Attackkkkkkk!');
    }
    handleInput(input) {
      // if(input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      //     this.game.player.setState(playerStates.RUNNING, 3);
      // } else if(input.includes('r')) {
      //     this.game.player.setState(playerStates.ROLLING, 10);
      // }
    }
}

class RunRight extends PlayerState {
    constructor(game) {
        super('RunRight', game);
    }
    enter() {
      this.game.player.playerState('RunRight');
      this.game.player.maxFrame = 7;
      //console.log('Attackkkkkkk!');
    }
    handleInput(input) {
      if(input.includes('ArrowLeft')) {
          this.game.player.setState(playerStates.RUNLEFT, this.game.player.frameCount);
      } else if(input.includes('ArrowUp')) {
          this.game.player.setState(playerStates.RUNRIGHT, this.game.player.frameCount);
      }
    }
}

class RunLeft extends PlayerState {
    constructor(game) {
        super('RUNLEFT', game);
    }
    enter() {
      this.game.player.playerState('RunLeft');
      this.game.player.maxFrame = 7;
      //console.log('Attackkkkkkk!');
    }
    handleInput(input) {
      if(input.includes('ArrowRight')) {
          this.game.player.setState(playerStates.RUNRIGHT, this.game.player.frameCount);
      } else if(input.includes('ArrowUp')) {
          this.game.player.setState(playerStates.RUNRIGHT, this.game.player.frameCount);
      }
    }
}
