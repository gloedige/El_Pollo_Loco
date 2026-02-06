class Character extends MoveableObject {
    height = this.HEIGHT_CANVAS;
    width = 240;
    CHARACTER_WALKING_IMAGES = [
            '../img/2_character_pepe/2_walk/W-21.png',
            '../img/2_character_pepe/2_walk/W-22.png',
            '../img/2_character_pepe/2_walk/W-23.png',
            '../img/2_character_pepe/2_walk/W-24.png',
            '../img/2_character_pepe/2_walk/W-25.png',
            '../img/2_character_pepe/2_walk/W-26.png'
        ];
    currentImageIndex = 0;
    world;
    speed = 6;
    

    constructor(x, y, img) {

        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.x = 30;
        this.y = 450 - this.height; // ground level
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.animate(this.CHARACTER_WALKING_IMAGES, 20);
        this.jump();
    }


    animate(imagePathsArr, speedAnimation) {
        
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
            }
            this.world.camera_x = -this.x;
        }, 1000/60);


        
        setInterval(() => {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(imagePathsArr);
                }
            }, 1000/speedAnimation);
    }
    



    jump() {
        // if (this.world.keyboard.UP) {
        //     this.y -= 5;
        // }
        // if (!this.world.keyboard.UP) {
        //     this.y += 5;
        // }
    }
}