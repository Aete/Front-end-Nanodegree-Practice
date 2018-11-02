var score = 0; //set the defalut score
var life = 5; //set the defalut life

// Enemies our player must avoid
// Enemy class
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sprite = 'images/enemy-bug.png';     // The image/sprite for our enemies, this uses. a helper we've provided to easily load images
    //set the x,y position
    this.x=x; // x position
    this.y=y; // y position
    //set the speed
    this.speed = Math.floor(Math.random()*300)+150; //set the speed of enemy
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x<505){
        this.x = this.x + this.speed * dt; // if enemy's x position is less than 505, increase the x position by speed*dt
    }
    else{
        this.x=Math.floor(Math.random()*(-200))-100; // if enemy's x position is more than 505, reset the enemy's x position to starting area
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(){  //The image/sprite for player, this uses.
    this.sprite = 'images/char-boy.png'; //load player image
    this.x=200;//x position
    this.y=400;//y position
};

Player.prototype.update = function(){
    if(this.pressedKeyValue == 'left' && this.x>0){ //moving left
        this.x=this.x-100;
    } else if(this.pressedKeyValue == 'up' && this.y>0){ //moving up
        this.y = this.y-90;
    } else if(this.pressedKeyValue == 'right'&& this.x<400){ //moving right
        this.x=this.x+100;
    } else if(this.pressedKeyValue == 'down' && this.y<400){ //moving down
        this.y=this.y+90;
    } else if(this.y<0){
        this.reset();
        score += 1;
        console.log(score);
    }
    this.pressedKeyValue = null;  //put this sentence to player moving one block by one input
    this.checkCollision(); //check collision
};

Player.prototype.checkCollision = function(){
    var playervalue = this;
    allEnemies.forEach(function(enemy) {
        if(playervalue.x >= enemy.x - 25 && playervalue.x <= enemy.x + 25) { //set the x range and y range to judge player collide with bug or not
            if(playervalue.y >= enemy.y - 25 && playervalue.y <= enemy.y + 25) {
                playervalue.reset();
                life -= 1;
                if(life===0){ //when life is 0, change the display
                    gameStart = false;
                }
            }
        }
    });
};

Player.prototype.render = function() { //rendering the player image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) { //change the input value
    this.pressedKeyValue = key;
};

Player.prototype.reset = function() { //reset the player position when collide with bug or reach the water
    this.x = 200;
    this.y = 400;
};
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.

var allEnemies = [ //make new enemies
    new Enemy(0, 50),
    new Enemy(0, 140),
    new Enemy(0, 230),
    new Enemy(-400, 140),
    new Enemy(-400, 50),
    new Enemy(-400, 230)
];

var player = new Player(); //make new player




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
