class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imagesCache = {};
    currentImageIndex = 0;

    draw(ctx) {
        try {
                if (this.xPositions && Array.isArray(this.xPositions)) {                    
                    this.xPositions.forEach(x => {
                        ctx.drawImage(this.img, x, this.y, this.width, this.height);
                    });
                } else {
                    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                }
        } catch (error) {
            console.warn('Error drawing image:', error);
            console.log('Could not load Image: ', this.img.src);
        }
    }


    loadImage(path) {
        this.img = new Image(); // <img>
        this.img.src = path;
    }
    
    
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
