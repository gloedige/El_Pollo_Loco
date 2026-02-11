class StatusBar extends DrawableObject {
    x = 10;
    y = 10;
    width = 200;
    height = 60;
    percentage = 100;
    STATUS_BAR_IMAGES = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
     };

    constructor() {
        super().loadImage(this.STATUS_BAR_IMAGES[5]);
        this.loadImages(this.STATUS_BAR_IMAGES);
        let self = this;
    }

    setPercentage(percentage) {
        if (percentage <= 0) {
            return 0;
        } else if (percentage >= 100) {
            return 5;
        }
        this.percentage = percentage;
        let index = Math.floor(percentage / 20);
        if (index < 0) index = 0;
        if (index >= this.STATUS_BAR_IMAGES.length) index = this.STATUS_BAR_IMAGES.length - 1;
        this.img = this.imageCache[this.STATUS_BAR_IMAGES[index]];
    }


}
