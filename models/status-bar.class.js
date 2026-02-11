class StatusBar extends DrawableObject {
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
        super();
        this.loadImages(this.STATUS_BAR_IMAGES);
        this.setPercentage(100);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 60;
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
