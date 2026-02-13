class BackgroundObject extends MoveableObject{
    height = this.HEIGHT_CANVAS;
    width = 719 * 2;
    parallaxSpeed = 0;
    xPositions = [];

    constructor(imagePath, xPositions, parallaxSpeed){
        super().loadImage(imagePath);
        this.image = imagePath;
        this.x = xPositions[0];
        this.y = 0;
        this.parallaxSpeed = parallaxSpeed;
        this.xPositions = xPositions;
    }
}