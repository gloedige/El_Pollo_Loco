class BackgroundObject extends MoveableObject{
    height = this.HEIGHT_CANVAS;
    width = 720;

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}