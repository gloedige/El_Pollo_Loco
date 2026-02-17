class StatusBar extends DrawableObject {
    percentage;
    STATUS_BAR_IMAGES = [];
    
    constructor(x, y, imageArray, percentage) {
        super();
        this.STATUS_BAR_IMAGES = imageArray;
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
