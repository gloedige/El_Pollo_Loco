/**
 * Class representing a background object in the game. Background objects are static 
 * elements that form the game's scenery.
 * They have a fixed height and width and are positioned at a specific x-coordinate.
 */
class BackgroundObject extends MoveableObject{
    height = this.HEIGHT_CANVAS;
    width = 720;

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}