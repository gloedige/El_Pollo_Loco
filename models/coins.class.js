class Coins extends MoveableObject {
    height = 50;
    width = 50;
    COIN_IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');
        this.x = 300 + Math.random() * 470;
        this.y = 300, // + Math.random() * 420;
        this.loadImages(this.COIN_IMAGES);
        this.animate(this.COIN_IMAGES, 10);
    }

    animate(imagePathsArr, speedAnimation) {
        setInterval(() => {
            this.playAnimation(imagePathsArr);
        }, 1000/speedAnimation);

    }

}