/**
 * Class representing a cloud in the game.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject{
    y = 20;
    height = 250;
    width = 500;
    
    /**
     * 
     * @param {number} y - The vertical position of the cloud on the canvas. 
     */
    constructor(y){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 100 + Math.random() * 4000;
        this.y = y;
        this.speed = 0.1 + Math.random() * 0.3;
        this.autoMoveLeft(this.x, this.width);
    }

    /**
     * Starts the cloud animation loop, moving it left across the canvas.
     */
    animate() {
        this.autoMoveLeft(this.x, this.width);
    }

   

}