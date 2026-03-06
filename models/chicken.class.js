/**
 * Represents a Chicken enemy in the game.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject{
    width = 100;
    CHICKEN_WALKING_IMAGES = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    CHICKEN_DEAD_IMAGE = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    world;
    offset = {
        top: 20,
        left: 10,
        right: 10,
        bottom: 20
    };
    CHICKEN_LEFT_EDGE = 0;
    CHICKEN_RIGHT_EDGE = 4200 - this.width;


    /**
     * Creates a new Chicken instance and initializes its properties.
     */
    constructor(){
        super().loadImage(this.CHICKEN_WALKING_IMAGES[0]);
        this.x = 300 + Math.random() * 2470;
        this.height = 120;
        this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL - this.height;
        this.loadImages(this.CHICKEN_WALKING_IMAGES);
        this.loadImages(this.CHICKEN_DEAD_IMAGE);
        this.animate(this.CHICKEN_WALKING_IMAGES, 12);
        this.speed = 0.5 + Math.random() * 2;
        this.energy = 5;
        this.start_walking = true;
        this.autoMoveChicken(this.x);
    }


    /**
     * Starts the chicken animation loop.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     * @param {number} speedAnimation - Animation speed (frames per second).
     */
    animate(imagePathsArr, speedAnimation) {
        let interval_moveChicken = setInterval(() => this.autoMoveChicken(this.x), 1000/25);
        let interval_playChicken = setInterval(() => this.playChicken(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_moveChicken);
        window.activeIntervals.push(interval_playChicken);
    }


    /**
     * Plays the chicken animation depending on its state (dead or alive).
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     */
    playChicken(imagePathsArr) {
        if (this.dead) {
            this.playSingleLoopAnimation(this.CHICKEN_DEAD_IMAGE);
        } else {
            this.playMultiLoopAnimation(imagePathsArr);
        }
    }


    /**
     * This function automatically moves the chicken left and right between defined edges. It also 
     * handles the initial walking state to set the starting position.
     * @param {number} Start_position_x - The starting x position of the chicken.
     */
    autoMoveChicken(Start_position_x) {
        this.moveChicken(Start_position_x);
        this.handleMovementThresholds();
    }

        
    /**
     * Moves the chicken based on its current direction and speed.
     * @param {number} start_position_x - The starting x position of the chicken.
     */
    moveChicken(start_position_x) {
        if (this.start_walking) {
            this.x = start_position_x;
            this.start_walking = false;
        }
        if (!this.otherDirection){
            this.x -= this.speed;
    
        }
        else {
            this.x += this.speed;
        }
    }


    /**
     * Handles movement boundaries for the chicken.
     */
    handleMovementThresholds() {
        if (this.x <= this.CHICKEN_LEFT_EDGE) {
            this.x = this.CHICKEN_LEFT_EDGE;
            this.otherDirection = true;
        }
        if (this.x >= this.CHICKEN_RIGHT_EDGE) {
            this.x = this.CHICKEN_RIGHT_EDGE;
            this.otherDirection = false;
         }
    }

}