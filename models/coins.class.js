class Coin extends MoveableObject {
    height = 120;
    width = 120;
    COIN_IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    middleOfCoins = this.width / 2;
    level_end_x = 720 * 2 * 3 - 720;

    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    };

    constructor() {
        super().loadImage(this.COIN_IMAGES[0]);
        this.x = 300 + Math.random() * (this.level_end_x - 300); // coins will be placed between x=300 and the end of the level
        // this y should be between 150 and 400, so that the coins are not too high or too low on the canvas. The middleOfCoins is subtracted to center the coin vertically around its y position.
        this.y = 150 - this.middleOfCoins + Math.random() * 250;
        // this.y = 150 - this.middleOfCoins + Math.random() * 300;
        this.loadImages(this.COIN_IMAGES);
        this.animate(this.COIN_IMAGES, 5);
    }

    animate(imagePathsArr, speedAnimation) {
        let interval_playCoin = setInterval(() => {
            this.playAnimation(imagePathsArr);
        }, 1000/speedAnimation);
        window.activeIntervals.push(interval_playCoin);
    }

}