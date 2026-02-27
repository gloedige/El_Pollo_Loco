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
        this.autoMoveLeft(this.x, this.width);
        this.energy = 5;
    }


    /**
     * Starts the chicken animation loop.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     * @param {number} speedAnimation - Animation speed (frames per second).
     */
    animate(imagePathsArr, speedAnimation) {
        let interval_playChicken = setInterval(() => this.playChicken(imagePathsArr), 1000/speedAnimation);
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

}