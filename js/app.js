// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 10;
    this.sprite = 'images/enemy-bug.png';
  }

  randomSpeed() {
    return (Math.floor(Math.random() * 5) + 1) * 100; 
  }

  update(dt) {
    this.x = this.x > 500 ? getRandomX() : this.x + this.randomSpeed() * dt;
    this.checkCollisions();
  }

  // check for collisions
  checkCollisions() { 
    if (this.x - this.width <= player.x && player.x <= this.x + this.width &&
      (this.y - this.height <= player.y && player.y <= this.y + this.height)) {
        console.log("collision found player", player.x, player.y);
        console.log("collision found enemy", this.x, this.y);
        player.startPosition();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  update() {
    this.resetOnTouchWater();
  }

  startPosition() {
      this.x = 200;
      this.y = 380;
  }

  // on touch of water 
  // message game won
  //go to start position
  resetOnTouchWater() {
    if (this.y <= 0) {
      alert("You won");
      this.startPosition();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

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
    console.log(this.x, this.y, allEnemies);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const getRandomX = () => Math.floor(Math.random() * 300) - 299;
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