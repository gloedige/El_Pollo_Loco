class Character extends MoveableObject {
    height = this.HEIGHT_CANVAS;
    width = 240;
    constructor(x, y, img) {

        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.x = 30;
        this.y = 450 - this.height; // ground level
    }

    jump() {
    
    }
}