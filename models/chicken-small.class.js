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
    JUMPCOOLDOWN = 1000; // in milliseconds
    speed = 0;

    constructor() {
        super().loadImage(this.CHICKEN_SMALL_WALKING_IMAGES[0]);
        this.x = 300 + Math.random() * 2470;
        this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL_CHICKEN_SMALL - this.height;
        this.loadImages(this.CHICKEN_SMALL_WALKING_IMAGES);
        this.loadImages(this.CHICKEN_SMALL_DEAD_IMAGE);
        this.animateOnJump(this.CHICKEN_SMALL_WALKING_IMAGES);
        this.applyGravity();
        this.jumpRandomly();
    }


    animateOnJump(imagePathsArr) {
        let interval_playChicken = setInterval(() => this.playChickenOnJump(imagePathsArr), 1000/12);
        window.activeIntervals.push(interval_playChicken);
    }


    playChickenOnJump(imagePathsArr) {
        if (this.isAboveGround()) {
            this.playMultiLoopAnimation(imagePathsArr);
        }
        else {
            this.playSingleLoopAnimation(this.CHICKEN_SMALL_WAIT_IMAGES);
        }
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
        }, 1000 / 50);
        window.activeIntervals.push(interval_jumpRandomly);
    }

    pauseJumping(){
        let currentTime = new Date().getTime();
        if (currentTime - this.lastJumpTime < this.JUMPCOOLDOWN) {
            return true; // still in cooldown, pause jumping
        }
        return false; // cooldown finished, allow jumping
    }

    

}