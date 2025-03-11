const playerStates = {
    //We will use enum to define a set of named constants
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    // CROUCHING_LEFT: 2,
    // CROUCHING_RIGHT: 3,
    RUNNING_LEFT: 2,
    RUNNING_RIGHT: 3,
    JUMPING_LEFT: 4,
    JUMPING_RIGHT: 5,
    FALLING_LEFT: 6,
    FALLING_RIGHT: 7
}

class PlayerState {
    constructor(playerState, game) {
        this.game = game;
        this.game.playerState = playerState;
    }
}

class StandingLeft extends PlayerState {
    constructor(game) {
        super('STANDING LEFT', game);
        //this.game.player = player;
    }
    enter() {
        this.game.player.playerState('StandingLeft');
    }
    handleInput(input) {
        //if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.STANDING_RIGHT); //Set state to StandingRight
        if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.RUNNING_RIGHT);
        else if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.RUNNING_LEFT);
        else if(input === "PRESS down") this.game.player.setPlayerState(playerStates.SITTING_LEFT);
        else if(input === "PRESS up") this.game.player.setPlayerState(playerStates.JUMPING_LEFT);
    }
}

class StandingRight extends PlayerState {
    constructor(game) {
        super('STANDING RIGHT', game);
        //this.game.player = player;
    }
    enter() {
        this.game.player.maxFrame = 6;
        this.game.player.speed = 0;
        this.game.player.playerState('StandingRight');
    }
    handleInput(input) {
        //if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.STANDING_LEFT); //Set state to StandingLeft
        if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.RUNNING_LEFT);
        else if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.RUNNING_RIGHT);
        else if(input === "PRESS down") this.game.player.setPlayerState(playerStates.SITTING_RIGHT);
        else if(input === "PRESS up") this.game.player.setPlayerState(playerStates.JUMPING_RIGHT);
    }
}

// class CrouchingLeft extends PlayerState {
//     constructor(game) {
//         super('CROUCHING RIGHT');
//         this.game.player = player;
//     }
//     enter() {
//         this.game.player.maxFrame = 4;
//         this.game.player.frameY = 9;
//         this.game.player.speed = 0;
//     }
//     handleInput(input) {
//         if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.SITTING_RIGHT); //Set state to CrouchingRight
//         else if(input === 'PRESS up') this.game.player.setPlayerState(playerStates.STANDING_LEFT);
//         else if(input === 'RELEASE down') this.game.player.setPlayerState(playerStates.STANDING_LEFT);
//     }
// }
//
// class CrouchingRight extends PlayerState {
//     constructor(game) {
//         super('CROUCHING RIGHT');
//         this.game.player = player;
//     }
//     enter() {
//         this.game.player.maxFrame = 4;
//         this.game.player.frameY = 8;
//         this.game.player.speed = 0;
//     }
//     handleInput(input) {
//         if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.SITTING_LEFT); //Set state to CrouchingLeft
//         else if(input === 'PRESS up') this.game.player.setPlayerState(playerStates.STANDING_RIGHT);
//         else if(input === 'RELEASE down') this.game.player.setPlayerState(playerStates.STANDING_RIGHT);
//     }
// }

class RunningLeft extends PlayerState {
    constructor(game) {
        super('RUNNING LEFT', game);
        //this.game.player = player;
    }
    enter() {
      this.game.player.playerState('RunningLeft');
        // this.game.player.maxFrame = 8;
        // this.game.player.frameY = 7;
        // this.game.player.speed = -this.game.player.maxSpeed;
    }
    handleInput(input) {
        if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.RUNNING_RIGHT); //Set state to RunningLeft
        else if(input === 'RELEASE left') this.game.player.setPlayerState(playerStates.STANDING_LEFT);
        else if(input === "PRESS down") this.game.player.setPlayerState(playerStates.SITTING_LEFT);
    }
}

class RunningRight extends PlayerState {
    constructor(game) {
        super('RUNNING RIGHT', game);
    }
    enter() {
      this.game.player.playerState('RunningRight');
        // this.player.maxFrame = 8;
        // this.player.frameY = 6;
        // this.player.speed = this.player.maxSpeed;
    }
    handleInput(input) {
        if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.RUNNING_LEFT); //Set state to RunningLeft
        else if(input === 'RELEASE right') this.game.player.setPlayerState(playerStates.STANDING_RIGHT);
        else if(input === "PRESS down") this.game.player.setPlayerState(playerStates.SITTING_RIGHT);

        //Jump while running (works but incomplete)
        //if(input === 'PRESS up') this.player.setPlayerState(playerStates.JUMPING_RIGHT); //Set state to JumpingRight
    }
}

class JumpingLeft extends PlayerState {
    constructor(game) {
        super('JUMPING LEFT', game);
        //this.game.player = player;
    }
    enter() {
      this.game.player.playerState('JumpingLeft');
        // this.game.player.maxFrame = 6;
        // this.game.player.frameY = 3;
        // if(this.game.player.onGround()) this.game.player.vy -= 20;
        // //This allows player to move horizontally in the air
        // this.game.player.speed = -this.game.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.JUMPING_RIGHT); //Set state to JumpingRight
        else if(this.game.player.onGround()) this.game.player.setPlayerState(playerStates.STANDING_LEFT);
        else if(this.game.player.vy > 0) this.game.player.setPlayerState(playerStates.FALLING_LEFT);
    }
}

class JumpingRight extends PlayerState {
    constructor(game) {
        super('JUMPING RIGHT', game);
        //this.game.player = player;
    }
    enter() {
      this.game.player.playerState('JumpingRight');
        // this.game.player.maxFrame = 6;
        // this.game.player.frameY = 2;
        // if(this.game.player.onGround()) this.game.player.vy -= 20;
        // this.game.player.speed = this.game.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.JUMPING_LEFT); //Set state to JumpingLeft
        else if(this.game.player.onGround()) this.game.player.setPlayerState(playerStates.STANDING_RIGHT);
        else if(this.game.player.vy > 0) this.game.player.setPlayerState(playerStates.FALLING_RIGHT);
    }
}


class FallingLeft extends PlayerState {
    constructor(game) {
        super('FALLING LEFT', game);
        //this.game.player = player;
    }
    enter() {
      this.game.player.playerState('FallingLeft');
        // this.game.player.maxFrame = 6;
        // this.game.player.frameY = 5;
        // //This allows player to move horizontally in the air
        // this.game.player.speed = -this.game.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if(input === 'PRESS right') this.game.player.setPlayerState(playerStates.FALLING_RIGHT); //Set state to FallingRight
        else if(this.game.player.onGround()) this.game.player.setPlayerState(playerStates.STANDING_LEFT);
    }
}

class FallingRight extends PlayerState {
    constructor(game) {
        super('FALLING RIGHT', game);
        //this.game.player = player;
    }
    enter() {
      this.game.player.playerState('FallingRight');
        // this.game.player.maxFrame = 6;
        // this.game.player.frameY = 4;
        // this.game.player.speed = this.game.player.maxSpeed * 0.5;
    }
    handleInput(input) {
        if(input === 'PRESS left') this.game.player.setPlayerState(playerStates.JUMPING_LEFT); //Set state to JumpingRight
        else if(this.game.player.onGround()) this.game.player.setPlayerState(playerStates.STANDING_RIGHT);
    }
}
