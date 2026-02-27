/**
 * Class representing a coin in the game.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
    height = 120;
    width = 120;
    COIN_IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    middleOfCoins = this.width / 2;
    level_end_x = 720 * 2 * 3 - 720;

    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };


    /**
     * Creates a new Coin instance and initializes its properties.
     * @param {number} [x] - The horizontal position of the coin on the canvas.
     * @param {number} [y] - The vertical position of the coin on the canvas.
     */
    constructor(x, y) {
        super().loadImage(this.COIN_IMAGES[0]);
        this.x = x !== undefined ? x : 300 + Math.random() * (this.level_end_x - 300);
        this.y = y !== undefined ? y : 150 - this.middleOfCoins + Math.random() * 250; // 
        this.loadImages(this.COIN_IMAGES);
        this.animate(this.COIN_IMAGES, 5);
    }


    /**
     * Starts the coin animation loop.
     * @param {Array<string>} imagePathsArr - Array of image paths for animation.
     * @param {number} speedAnimation - Animation speed (frames per second).
     */
    animate(imagePathsArr, speedAnimation) {
        let interval_playCoin = setInterval(() => {
            this.playMultiLoopAnimation(imagePathsArr);
        }, 1000/speedAnimation);
        window.activeIntervals.push(interval_playCoin);
    }

}