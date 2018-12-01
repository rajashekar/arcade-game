// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    this.x = this.x > 500 ? getRandomX() : this.x + 50 * dt;
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
    this.checkCollisions();
  }

  // on touch of water go to start position
  resetOnTouchWater() {
    if (this.y <= 0) {
      this.x = 200;
      this.y = 380;
    }
  }

  // check for collisions
  checkCollisions() {
    for (let key in allEnemies) {
      let enemyX = Math.floor(allEnemies[key].x);
      let enemyY = Math.floor(allEnemies[key].y);
      if (enemyX - 75 <= this.x && this.x <= enemyX + 75 &&
        (enemyY - 10 <= this.y && this.y <= enemyY + 10)) {
        console.log("collision found player", this.x, this.y);
        console.log("collision found enemy", key, allEnemies[key]);
        this.x = 200;
        this.y = 380;
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(input) {
    console.log(input);
    switch (input) {
      case 'left':
        this.x -= 20;
        break;
      case 'right':
        this.x += 20;
        break;
      case 'up':
        this.y -= 20;
        break;
      case 'down':
        this.y += 20;
        break;
    }
    console.log(this.x, this.y, allEnemies);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const getRandomX = () => Math.floor(Math.random() * 400) - 399;
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