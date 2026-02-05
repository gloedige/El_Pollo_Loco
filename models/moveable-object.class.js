class  MoveableObject {
    x;
    y;
    img;
    height;
    width;
    HEIGHT_CANVAS = 480;
    imagesCache = {};

    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    loadImage(path) {
        this.img = new Image(); // <img>
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach ((path) => {
            let img = new Image();
            img.src = path;
            this.imagesCache[path] = img;
        });
    }

    moveRight() {
        console.log("Move right");
    }

     moveLeft(){
        console.log("Chicken moves left");
    }
}