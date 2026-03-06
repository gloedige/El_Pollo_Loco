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
    splashPromise = null;


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
     * Throws the object by applying gravity and updating its position.
    */
   throw() {
       this.isThrown = true;
       this.interval_throw = setInterval(() => {
           this.applyGravity();
           if (this.otherDirection) {
               this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
        }, 1000/20);
        window.activeIntervals.push(this.interval_throw);
    }


    /**
     * This function animates the rotation of the throwable object by cycling through 
     * a set of rotation images at a fixed interval.
     */
    anmitedRotation() {
        this.interval_rotation = setInterval(() => {
            if (!this.isThrown) {
                clearInterval(this.interval_rotation);
                return;
            }
            this.playMultiLoopAnimation(this.BOTTLE_ROTATION_IMAGES);
        }, 1000/30);
        window.activeIntervals.push(this.interval_rotation);
    }


    /**
     * This function stops the movement of the throwable object by setting its horizontal and vertical 
     * speeds to zero, marking it as no longer thrown, and starting the splash animation. It also 
     * clears the interval responsible for the throwing motion.
     */
    stopBottleMovement() {
        this.isThrown = false;
        this.speedY = 0;
        this.acceleration = 0;
        clearInterval(this.interval_throw);
        clearInterval(this.interval_rotation);
    }
    
    
    /**
     * This function handles the splash effect when the throwable object hits the ground by stopping its 
     * movement and playing the splash animation.
     */
    handleBottleSplash() {
        if (this.splashPromise) {
            return this.splashPromise;
        }
        this.currentImageIndex = 0;
        this.splashPromise = this.playSplashAnimation().finally(() => {
            this.splashPromise = null;
        });
        return this.splashPromise;
    }


    /**
     * This function animates the splash effect when the throwable object hits the ground by cycling 
     * through a set of splash images at a fixed interval.
     */
    playSplashAnimation() {
        return new Promise((resolve) => {
            this.interval_splash = setInterval(() => {
                const isLastFrame = this.singleTimeAnimation(this.BOTTLE_SPLASH_IMAGES);
                if (isLastFrame) {
                    clearInterval(this.interval_splash);
                    resolve();
                }
            }, 1000/10);
            window.activeIntervals.push(this.interval_splash);
        });
    }


    /**
     * Animates a sequence of images once, updating the current image index.
     * @param {string[]} imagePathsArr - Array of image paths for the animation frames.
     * @returns {boolean} - Returns true if the last frame has been reached, otherwise false.
     */
    singleTimeAnimation(imagePathsArr) {
        let frameIndex = Math.min(this.currentImageIndex, imagePathsArr.length - 1);
        let path = imagePathsArr[frameIndex];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
        return frameIndex === imagePathsArr.length - 1;
    }
}