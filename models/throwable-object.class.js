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

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };


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
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 50;
        this.width = 50;
        this.speedX = 50;
        this.speedY = 10;
        this.throw();
    };
    

    /**
     * Throws the object by applying gravity and updating its position.
     */
    throw() {
        let interval_throw = setInterval(() => {
            this.applyGravity();
            this.playMultiLoopAnimation(this.BOTTLE_ROTATION_IMAGES);
            if (this.otherDirection) {
                this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
            this.y -= this.speedY;
        }, 50);
        window.activeIntervals.push(interval_throw);

    }
}