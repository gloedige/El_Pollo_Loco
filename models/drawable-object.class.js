/**
 * Class representing a drawable object in the game.
 */
class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imagesCache = {};
    currentImageIndex = 0;


    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error drawing image:', error);
            console.log('Could not load Image: ', this.img.src);
        }
    }

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); // <img>
        this.img.src = path;
    }
    
    
    /**
     * Loads multiple images from the specified paths.
     * @param {Array<string>} arr - Array of image paths.
     */
    loadImages(arr){
        arr.forEach ((path) => {
            try {
                let img = new Image();
                img.src = path;
                this.imagesCache[path] = img;
            } catch (error) {
                console.error('Error loading image:', error);
            }
        });
    }

}
