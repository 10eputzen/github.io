// Enemies our player must avoid
var Enemy = function() {
    this.minY = 50;
    this.maxY = 200;
    this.minX = -100;
    this.maxX = 475;

    this.x = -100;
    this.y = 0;

    this.speed = 100;
    this.minSpeed = 40;
    this.maxMinSpeed = 80;
    this.maxSpeed = 300;
    this.sprite = "images/enemy-bug.png";
};


Enemy.prototype.update = function(dt) {
    var location = this.x + (dt * this.speed);
    //Check if Enemy is out of bound
    if (location < this.maxX) {
        this.x = location;
        if (!this.checkForCollission())
            this.render();
        else //Reset the Game if there was a collision
            player.resetGame(false);
    } else {
        //Reset Enemy Position
        this.x = -100;
        this.y = Math.floor((Math.random() * this.maxY) + this.minY);
    }
};

//Checking if the enemy collides with the player
Enemy.prototype.checkForCollission = function() {
    if ((Math.abs(this.x - player.x) < 75) && (Math.abs(this.y - player.y) < 50))
        return true;
    else
        return false;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Instead of putting attributes like level and win into the player class, one could have also created an option class, but this was the easiest way :)
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.minY = 0;
    this.maxY = 400;
    this.minX = 0;
    this.maxX = 400;
    this.level = 1;
    this.points = 0;
    this.reset = false;
    this.win = false;
    this.hearts = 3;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function(dt) {
    //Not sure why we would need that...
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case "left":
            if (this.x > this.minX)
                this.x = this.x - this.speed;
            break;
        case "up":
            if (this.y > this.minY)
                this.y = this.y - this.speed;
            else {
                //Player reached the Water and beat the level
                this.resetGame(true);
            }
            break;
        case "right":
            if (this.x < this.maxX)
                this.x = this.x + this.speed;
            break;
        case "down":
            if (this.y < this.maxY)
                this.y = this.y + this.speed;
            break;
    }
};

//Resets the game and check for Win/Lose
Player.prototype.resetGame = function(win) {
    if (win) {
        this.level++;
        this.points++;
        this.win = true;
    } else {
        this.win = false;
        if (this.points > 0) {
            this.points--;
        }
        if (this.hearts >= 0)
            this.hearts--;

        if (this.hearts < 0) {
            //Reset the whole Character
            this.x = 200;
            this.y = 400;
            this.speed = 25;
            this.hearts = 3;
            this.points = 0;
            this.level = 1;
        }
    }
    this.reset = true;
};

//Return the current Points
Player.prototype.getPoints = function() {
    return this.points;
};
//Return current Level
Player.prototype.getLevel = function() {
    return this.level;
};

//Creating the Character
player = new Player(200, 400, 25);

//Create new enemy with individual min and max Speed, depending on the level
function generateEnemy(level) {
    var enemy = new Enemy();
    enemy.y = Math.floor((Math.random() * enemy.maxY) + enemy.minY);
    var maxSpeed = Math.floor((Math.random() * (enemy.maxSpeed - (300 / (level * 2)))) + enemy.minSpeed);
    var minSpeed = Math.floor((Math.random() * (enemy.maxMinSpeed - (200 / (level * 2)))) + enemy.minSpeed);
    enemy.speed = Math.floor((Math.random() * maxSpeed) + (minSpeed));
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
