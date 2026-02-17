class Bottles extends MoveableObject {
    height = 100;
    width = 100;
    BOTTLE_IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    level_end_x = 720 * 2 * 3 - 720;
    groundPosition = 440;

     offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    constructor() {
        super().loadImage(this.BOTTLE_IMAGES[0]);
        this.x = 300 + Math.random() * (this.level_end_x - 300);
        this.y = this.groundPosition - this.height;
        this.loadImages(this.BOTTLE_IMAGES);
        this.selectRandomImage(this.BOTTLE_IMAGES);
    }

};