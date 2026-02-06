class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    ENDBOSS_WALKING_IMAGES = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/2_alert/G5.png');
        
        this.x = 300;
        this.y = 450 - this.height;
        this.loadImages(this.ENDBOSS_WALKING_IMAGES);
        this.animate(this.ENDBOSS_WALKING_IMAGES, 5);
        // this.autoMoveLeft(this.x, this.width);
    }

    animate(imagePathsArr, speedAnimation) {
        setInterval(() => {
            this.playAnimation(imagePathsArr);
        }, 1000/speedAnimation);
    }
}