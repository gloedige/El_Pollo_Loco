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

    constructor() {
        super().loadImage(this.COIN_IMAGES[0]);
        this.x = 300 + Math.random() * (this.level_end_x - 300);
        this.y = 150 - this.middleOfCoins + Math.random() * 250;
        this.loadImages(this.COIN_IMAGES);
        this.animate(this.COIN_IMAGES, 5);
    }

    animate(imagePathsArr, speedAnimation) {
        let interval_playCoin = setInterval(() => {
            this.playMultiLoopAnimation(imagePathsArr);
        }, 1000/speedAnimation);
        window.activeIntervals.push(interval_playCoin);
    }

}