/**
 * Enemy class - player should avoid enemy objects
 */
class Enemy {
  // set any initial params for enemy object
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 10;
    this.sprite = 'images/enemy-bug.png';
  }

  // give random speed
  randomSpeed() {
    return (Math.floor(Math.random() * 5) + 1) * 100; 
  }

  // update enemy position with random speed
  update(dt) {
    this.x = this.x > 500 ? getRandomX() : this.x + this.randomSpeed() * dt;
    // check for collisions
    this.checkCollisions();
  }

  // check if player is in colliding range
  checkCollisions() { 
    if (this.x - this.width <= player.x && player.x <= this.x + this.width &&
      (this.y - this.height <= player.y && player.y <= this.y + this.height)) {
        // if so send player to start position
        player.startPosition();
    }
  }

  // to render enemy image
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
 * Player class - used to create player object
 */
class Player {
  // set any initial params for enemy object
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  // updates the player position
  update() {
    this.resetOnTouchWater();
  }

  // start position for player
  startPosition() {
      this.x = 200;
      this.y = 380;
  }

  // on touch of water 
  // message game won
  // go to start position
  resetOnTouchWater() {
    if (this.y <= 0) {
      alert("You won");
      this.startPosition();
    }
  }

  // to render player image
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // move player based on keyboard up, down, left & right arrows
  handleInput(input) {
    console.log(input);
    switch (input) {
      case 'left':
        this.x <= -20 ? this.x = -20 : this.x -= 20;
        break;
      case 'right':
        this.x >= 420 ? this.x = 420 : this.x += 20;
        break;
      case 'up':
        this.y -= 20;
        break;
      case 'down':
        this.y >= 440 ? this.y = 440 : this.y += 20;
        break;
    }
  }
}

// get random positions for enemy
const getRandomX = () => Math.floor(Math.random() * 300) - 299;

// placing 3 enemy objects at random positions
const allEnemies = [];
allEnemies.push(new Enemy(getRandomX(), 60));
allEnemies.push(new Enemy(getRandomX(), 145));
allEnemies.push(new Enemy(getRandomX(), 230));

// player initial location
player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});