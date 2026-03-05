/**
 * Class representing a throwable object (e.g., bottle).
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
    otherDirection = false;
    BOTTLE_ROTATION_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    BOTTLE_SPLASH_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    ];

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };
    SPEEDY_MAX = -5;


    /**
     * Creates a new throwable object.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @param {boolean} otherDirection - Direction of the throw.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage(this.BOTTLE_ROTATION_IMAGES[0]);
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 80;
        this.width = 80;
        this.speedX = 40;
        this.speedY = 20;
        this.isThrown = false;
        this.handleThrow();
    };


    /**
     * Handles the throwing action by initiating the throw and starting the rotation animation.
     */
    handleThrow() {        
        this.throw();
        this.anmitedRotation();
    }


    /**
     * This function animates the rotation of the throwable object by cycling through 
     * a set of rotation images at a fixed interval.
     */
    anmitedRotation() {
        let interval_rotation = setInterval(() => {
            if (!this.isThrown) {
                clearInterval(interval_rotation);
                return;
            }
            this.playMultiLoopAnimation(this.BOTTLE_ROTATION_IMAGES);
        }, 1000/30);
        window.activeIntervals.push(interval_rotation);
    }
    

    /**
     * Throws the object by applying gravity and updating its position.
     */
    throw() {
        this.isThrown = true;
        let interval_throw = setInterval(() => {
            this.applyGravity();
            if (this.otherDirection) {
                this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
        }, 1000/20);
        window.activeIntervals.push(interval_throw);

    }
}