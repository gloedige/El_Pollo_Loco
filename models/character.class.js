class Character extends MoveableObject {
    height = this.HEIGHT_CANVAS;
    width = 240;
    IMAGES_WALKING = [
            '../img/2_character_pepe/2_walk/W-21.png',
            '../img/2_character_pepe/2_walk/W-22.png',
            '../img/2_character_pepe/2_walk/W-23.png',
            '../img/2_character_pepe/2_walk/W-24.png',
            '../img/2_character_pepe/2_walk/W-25.png',
            '../img/2_character_pepe/2_walk/W-26.png'
        ];
    currentImageIndex = 0;

    constructor(x, y, img) {

        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.x = 30;
        this.y = 450 - this.height; // ground level
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImageIndex % this.IMAGES_WALKING.length; // let I = 0 % 6
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
            let path = this.IMAGES_WALKING[i];
            this.img = this.imagesCache[path];
            this.currentImageIndex++;
        }, 1000/10);
    }

    jump() {
    
    }
}