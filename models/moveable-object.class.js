class  MoveableObject extends DrawableObject {
    HEIGHT_CANVAS = 480;
    WIDTH_CANVAS = 720;
    GROUND_LEVEL = 50;
    GROUND_LEVEL_CHICKEN_SMALL = 60;
    speed = 0.1;
    end_position_x;
    difference_of_position = 0;
    level_end_x = 720 * 2 * 2 + 720;
    currentImageIndex = 0;
    speedY = 0;
    acceleration = 2.5;
    dead = false;
    lastHit = 0;
    colliding_detecting = true;
    coinsCollected = 0;
    bottlesCollected = 0;

    TIME_RESET_HURT = 1; // in seconds

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 10;
    
    constructor(x, y, img) {
        super();
        this.x = x;
        this.y = y;
        this.img = img;
    }

    
    autoMoveLeft(start_position_x, width_object) {
        this.x = start_position_x;
        this.end_position_x = -width_object;
        let interval_autoMoveLeft = setInterval(() => {
            this.x -= this.speed;
            if(this.x <= this.end_position_x){
                start_position_x = this.level_end_x; // reset to the right edge of the canvas
                this.x = start_position_x;
            }
        }, 1000 / 60);
        window.activeIntervals.push(interval_autoMoveLeft);
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    playMultiLoopAnimation(imagePathsArr) {
        let i = this.currentImageIndex % imagePathsArr.length;
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
    }


    playSingleLoopAnimation(imagePathsArr) {
        let i = this.currentImageIndex % imagePathsArr.length;
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
        if (this.currentImageIndex >= imagePathsArr.length) {
            this.currentImageIndex = imagePathsArr.length - 1;
        }
    }


    applyGravity() {
        let interval_gravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (!this.isAboveGround()) {
                if (this instanceof ChickenSmall) {
                    this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL_CHICKEN_SMALL - this.height;
                } else {
                    this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL - this.height;
                }
            }
        }, 1000 / 25);
        window.activeIntervals.push(interval_gravity);
    }


    isAboveGround() {
        if (this instanceof ChickenSmall) {
            return this.y < this.HEIGHT_CANVAS - this.GROUND_LEVEL_CHICKEN_SMALL - this.height;
        } else if (this instanceof ThrowableObject) {
            return true; 
        } else {
            return this.y < this.HEIGHT_CANVAS - this.GROUND_LEVEL - this.height;
        }   
    }


    jump() {
        this.speedY = 28;     
    }

    
    isColliding(movableObject) {
        return  this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
                this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
                this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }


    isHit() {
        return this.isHurt() && !this.dead;
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 500;
        return timePassed < this.TIME_RESET_HURT;
    }


    checkIsDead() {
        if (this.energy == 0) {
            this.dead = true;
            this.colliding_detecting = false;
            this.killedEnemy();
            if (this instanceof Chicken || this instanceof ChickenSmall) this.world.sounds.playEnemyIsHitSound();
        }
        if (this instanceof Character && this.dead && this.world != null) {
            setTimeout(() => { 
                showGameOverScreen();
                endGame();
            }, 1000);
        }
        else if (this instanceof Endboss && this.dead && !(this.world.character && this.world.character.dead) && this.world != null) {
            setTimeout(() => {
                showYouWinScreen();
                endGame();
            }, 1000);
        }
    }


    deleteElement(element) {
        if (element instanceof Coin) {
            const index = this.world.level.coins.indexOf(element);
            if (index > -1) {            
                this.world.level.coins.splice(index, 1);
            }
        }
        else if (element instanceof Bottle) {
            const index = this.world.level.bottles.indexOf(element);
            if (index > -1) {            
                this.world.level.bottles.splice(index, 1);
            }
        }
    }


    killedEnemy() {
        this.speed = 0;
    }


    jumpRandomly() {
        let interval_jumpRandomly = setInterval(() => {
            if (this.dead) {
                return;
            }
            if (Math.random() < 0.01 && !this.pauseJumping()) {
                this.jump();
                this.lastJumpTime = new Date().getTime();
            }
        }, 1000 / 30);
        window.activeIntervals.push(interval_jumpRandomly);
    }


    pauseJumping(){
        let currentTime = new Date().getTime();
        if (currentTime - this.lastJumpTime < this.JUMPCOOLDOWN) {
            return true;
        }
        return false;
    }

    
}