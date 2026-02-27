/**
 * Represents a moveable object in the game world.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
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
    TIME_RESET_HURT = 1;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 10;

    /**
     * Creates a new MoveableObject instance.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @param {string} img - Image path.
     */
    constructor(x, y, img) {
        super();
        this.x = x;
        this.y = y;
        this.img = img;
    }


    /**
     * Automatically moves the object left across the screen.
     * @param {number} start_position_x - Starting X position.
     * @param {number} width_object - Object width.
     */
    autoMoveLeft(start_position_x, width_object) {
        this.x = start_position_x;
        this.end_position_x = -width_object;
        let interval_autoMoveLeft = setInterval(() => {
            this.x -= this.speed;
            if(this.x <= this.end_position_x){
                start_position_x = this.level_end_x;
                this.x = start_position_x;
            }
        }, 1000 / 60);
        window.activeIntervals.push(interval_autoMoveLeft);
    }


    /**
     * Moves the object left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    /**
     * Moves the object right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    /**
     * Plays a multi-loop animation from an array of image paths.
     * @param {string[]} imagePathsArr - Array of image paths.
     */
    playMultiLoopAnimation(imagePathsArr) {
        let i = this.currentImageIndex % imagePathsArr.length;
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
    }


    /**
     * Plays a single-loop animation from an array of image paths.
     * @param {string[]} imagePathsArr - Array of image paths.
     */
    playSingleLoopAnimation(imagePathsArr) {
        let i = this.currentImageIndex % imagePathsArr.length;
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
        if (this.currentImageIndex >= imagePathsArr.length) {
            this.currentImageIndex = imagePathsArr.length - 1;
        }
    }


    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        let interval_gravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            this.resetItemToGround();
            
        }, 1000 / 25);
        window.activeIntervals.push(interval_gravity);
    }


    /**
     * Checks if the object is above ground.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ChickenSmall) {
            return this.y < this.HEIGHT_CANVAS - this.GROUND_LEVEL_CHICKEN_SMALL - this.height;
        } else if (this instanceof ThrowableObject) {
            return true; 
        } else {
            return this.y < this.HEIGHT_CANVAS - this.GROUND_LEVEL - this.height;
        }   
    }


    /**
     * Resets the object to ground level if not above ground.
     */
    resetItemToGround() {
        if (!this.isAboveGround()) {
                if (this instanceof ChickenSmall) {
                    this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL_CHICKEN_SMALL - this.height;
                } else {
                    this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL - this.height;
                }
                this.speedY = 0;
        }
    }


    /**
     * Makes the object jump by setting vertical speed.
     */
    jump() {
        this.speedY = 28;     
    }

    /**
     * Checks collision with another moveable object.
     * @param {MoveableObject} movableObject - The other object to check collision with.
     * @returns {boolean}
     */
    isColliding(movableObject) {
        return  this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
                this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
                this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }


    /**
     * Handles being hit and reduces energy.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is hit and not dead.
     * @returns {boolean}
     */
    isHit() {
        return this.isHurt() && !this.dead;
    }


    /**
     * Checks if the object is hurt.
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 500;
        return timePassed < this.TIME_RESET_HURT;
    }


    /**
     * Checks if the object is dead and handles death.
     */
    checkIsDead() {
        if (this.energy == 0) {
            this.handleIsDead();
        }
        if (this instanceof Character && this.dead && this.world != null) {
            this.handleGameOver();
        }
        else if (this instanceof Endboss && this.dead && !(this.world.character && this.world.character.dead) && this.world != null) {
            this.handleYouWin();
        }
    }


    /**
     * Handles object death state.
     */
    handleIsDead() {
        this.dead = true;
        this.colliding_detecting = false;
        this.killedEnemy();
        this.handleSoundsOnDeathForChicken();
    }
    

    /**
     * Handles win condition for the player.
     */
    handleYouWin() {
        setTimeout(() => {
            showYouWinScreen();
            endGame();
        }, 1000);
    }


    /**
     * Handles game over condition for the player.
     */
    handleGameOver() {
        setTimeout(() => { 
                showGameOverScreen();
                endGame();
            }, 1000);
    }


    /**
     * Handles sounds when a chicken dies.
     */
    handleSoundsOnDeathForChicken() {
        if (this instanceof Chicken || this instanceof ChickenSmall) this.world.sounds.playEnemyIsHitSound();
    }


    /**
     * Deletes an element (coin or bottle) from the world.
     * @param {Object} element - The element to delete.
     */
    deleteElement(element) {
        this.handleDeleteCoin(element);
        this.handleDeleteBottle(element);
    }


    /**
     * Handles deletion of a bottle element.
     * @param {Object} element - The bottle element.
     */
    handleDeleteBottle(element) {
        if (element instanceof Bottle) {
            const index = this.world.level.bottles.indexOf(element);
            if (index > -1) {            
                this.world.level.bottles.splice(index, 1);
            }
        }
    }


    /**
     * Handles deletion of a coin element.
     * @param {Object} element - The coin element.
     */
    handleDeleteCoin(element) {
        if (element instanceof Coin) {
            const index = this.world.level.coins.indexOf(element);
            if (index > -1) {            
                this.world.level.coins.splice(index, 1);
            }
        }
    }


    /**
     * Handles enemy killed state.
     */
    killedEnemy() {
        this.speed = 0;
    }


    /**
     * Makes the object jump randomly at intervals.
     */
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
    

    /**
     * Checks if jumping is paused due to cooldown.
     * @returns {boolean}
     */
    pauseJumping(){
        let currentTime = new Date().getTime();
        if (currentTime - this.lastJumpTime < this.JUMPCOOLDOWN) {
            return true;
        }
        return false;
    }
}