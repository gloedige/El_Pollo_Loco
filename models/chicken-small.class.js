class ChickenSmall extends Chicken {
    height = 60;
    width = 50;
    CHICKEN_SMALL_WALKING_IMAGES = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
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

    constructor() {
        super().loadImage(this.CHICKEN_SMALL_WALKING_IMAGES[0]);
        this.x = 300 + Math.random() * 2470;
        this.y = 420 - this.height; // ground level for chicken
        this.loadImages(this.CHICKEN_SMALL_WALKING_IMAGES);
        this.loadImages(this.CHICKEN_SMALL_DEAD_IMAGE);
        this.animate(this.CHICKEN_SMALL_WALKING_IMAGES, 12);
        this.applyGravity();
        this.jumpRandomly();
        // this.speed = 0.1 + Math.random() * 0.3;
    }

    autoMoveLeft(start_position_x, width_object) {
        this.x -= start_position_x;
        this.end_position_x = -width_object;
    }

    jumpRandomly() {
        let interval_jumpRandomly = setInterval(() => {
            if (this.dead) {
                return; // stop jumping if chicken is dead
            }
            if (Math.random() < 0.01) { // 5% chance to jump each frame
                this.jump();
            }
        }, 1000 / 50);
        window.activeIntervals.push(interval_jumpRandomly);
    }

    

}