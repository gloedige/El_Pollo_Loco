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
    

    constructor(x, y, img) {

        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.x = 30;
        this.y = 450 - this.height; // ground level
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.animate(this.CHARACTER_WALKING_IMAGES, 10);
    }
    

    jump() {
    
    }
}