/**
 * ChickenSmall class represents the small chicken enemy, handling its movement, animations, and behavior.
 */
class ChickenSmall extends MoveableObject {
    height = 60;
    width = 50;
    CHICKEN_SMALL_WALKING_IMAGES = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    CHICKEN_SMALL_WAIT_IMAGES = [
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];
    CHICKEN_SMALL_DEAD_IMAGE = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 10
    };
    lastJumpTime = 0;
    JUMPCOOLDOWN = 1000;
    speed = 0;
    

    /**
     * Creates a new ChickenSmall instance, sets initial position, loads images, starts animation, and applies gravity.
     */
    constructor() {
        super().loadImage(this.CHICKEN_SMALL_WALKING_IMAGES[0]);
        this.x = 300 + Math.random() * 3300;
        this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL_CHICKEN_SMALL - this.height;
        this.loadImages(this.CHICKEN_SMALL_WALKING_IMAGES);
        this.loadImages(this.CHICKEN_SMALL_DEAD_IMAGE);
        this.animateOnJump(this.CHICKEN_SMALL_WALKING_IMAGES);
        this.applyGravity();
        this.jumpRandomly();
        this.energy = 5;
    }


    /**
     * Starts animation interval for chicken jump.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     */
    animateOnJump(imagePathsArr) {
        let interval_playChicken = setInterval(() => this.playChickenOnJump(imagePathsArr), 1000/12);
        window.activeIntervals.push(interval_playChicken);
    }


    /**
     * Plays the appropriate animation based on chicken state (dead, jumping, or waiting).
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     */
    playChickenOnJump(imagePathsArr) {
        if (this.dead) {
            this.playSingleLoopAnimation(this.CHICKEN_SMALL_DEAD_IMAGE);
            window.clearInterval(this.interval_playChicken);
        }
        else if (this.isAboveGround()) {
            this.playMultiLoopAnimation(imagePathsArr);
        }
        else {
            this.playSingleLoopAnimation(this.CHICKEN_SMALL_WAIT_IMAGES);
        }
    } 
}