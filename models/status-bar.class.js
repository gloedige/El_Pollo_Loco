/**
 * Class representing a status bar (health, coins, bottles).
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    percentage = 100;
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
    

    /**
     * Creates a new status bar.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @param {string} imageString - Type of status bar ('health', 'coins', 'bottles').
     * @param {number} energy - Current energy value.
     * @param {number} totalEnergy - Total energy value for percentage calculation.
     */
    constructor(x, y, imageString, energy, totalEnergy) {
        super();
        this.STATUS_BAR_IMAGES = this[imageString.toUpperCase() + '_STATUS_BAR_IMAGES'];
        this.loadImages(this.STATUS_BAR_IMAGES);
        this.energy = energy;
        this.totalEnergy = totalEnergy;
        this.setPercentage(this.energy);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 50;
    }


    /**
     * Sets the current energy and updates the status bar image.
     * @param {number} currentEnergy - The current energy value.
     */
    setPercentage(currentEnergy) {
        this.energy = currentEnergy;
        this.getPercentage();
        let path = this.STATUS_BAR_IMAGES[this.getIndexOfImageForPercentage()];
        this.img = this.imagesCache[path];

    }


    /**      
     * Determines the index of the image to display based on the current percentage.
     * @returns {number} The index of the image to display.
     */
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

    
    /**
     * Calculates the current percentage based on energy and total energy.
     */
    getPercentage() {
        this.percentage = (this.energy / this.totalEnergy) * 100;
    }

}
