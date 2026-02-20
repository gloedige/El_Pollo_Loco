class StatusBar extends DrawableObject {
    percentage;
    HEALTH_STATUS_BAR_IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    COINS_STATUS_BAR_IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    BOTTLES_STATUS_BAR_IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    STATUS_BAR_IMAGES = [];
    
    constructor(x, y, imageString, percentage) {
        super();
        this.STATUS_BAR_IMAGES = this[imageString.toUpperCase() + '_STATUS_BAR_IMAGES'];
        this.loadImages(this.STATUS_BAR_IMAGES);
        this.percentage = percentage;
        this.setPercentage(this.percentage);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUS_BAR_IMAGES[this.getIndexOfImageForPercentage()];
        this.img = this.imagesCache[path];

    }

    getIndexOfImageForPercentage() {
        if (this.percentage <= 0) {
            return 0;
        } else if (this.percentage >= 100) {
            return 5;
        }
        let index = Math.floor(this.percentage / 20);
        if (index < 0) index = 0;
        if (index >= this.STATUS_BAR_IMAGES.length) index = this.STATUS_BAR_IMAGES.length - 1;
        return index;
    }

    }
