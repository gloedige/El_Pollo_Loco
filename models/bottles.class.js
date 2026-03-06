/**
 * Class representing a bottle in the game. Bottles are collectible items that the player can pick up.
 * They have a random image from a predefined set and are placed at random positions on the ground.
 */
class Bottle extends MoveableObject {
    height = 100;
    width = 100;
    BOTTLE_IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    level_end_x = 720 * 2 * 3 - 720;
    groundPosition = 430;

     offset = {
        top: 15,
        left: 35,
        right: 20,
        bottom: 10
    };


    /**
     * Initializes a new bottle with a random image and random position on the ground.
     */
    constructor() {
        super().loadImage(this.BOTTLE_IMAGES[0]);
        this.x = 300 + Math.random() * (this.level_end_x - 300);
        this.y = this.groundPosition - this.height;
        this.loadImages(this.BOTTLE_IMAGES);
        this.selectRandomImage(this.BOTTLE_IMAGES);
    }


    /**
     * Selects a random image from the provided array of image paths and sets it as the bottle's current image.
     * @param {string[]} imagePathsArr - Array of image paths
     */
    selectRandomImage(imagePathsArr) {
        let i = Math.floor(Math.random() * imagePathsArr.length);
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
    }
};