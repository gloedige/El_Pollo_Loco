class Chicken extends MoveableObject{
    // height = 120;
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
    
    constructor(){
        super().loadImage(this.CHICKEN_WALKING_IMAGES[0]);
        this.x = 300 + Math.random() * 2470; // random x position between 300 and 2770 (720 - 50 width of chicken)
        this.height = 120;
        this.y = 430 - this.height; // ground level for chicken
        this.loadImages(this.CHICKEN_WALKING_IMAGES);
        this.loadImages(this.CHICKEN_DEAD_IMAGE);
        this.animate(this.CHICKEN_WALKING_IMAGES, 12);
        this.speed = 0.1 + Math.random() * 0.3; // random speed between 0.1 and 0.4
        // this.speed = 0;
        this.autoMoveLeft(this.x, this.width);
        this.energy = 5; // chickens have less energy than the character
    }


    animate(imagePathsArr, speedAnimation) {
        let interval_playChicken = setInterval(() => this.playChicken(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_playChicken);
    }

    playChicken(imagePathsArr) {
        if (this.dead) {
            this.playDeadAnimation(this.CHICKEN_DEAD_IMAGE);
        } else {
            this.playAnimation(imagePathsArr);
        }
    }

}