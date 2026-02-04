class  MoveableObject {
    x;
    y;
    img;
    height;
    width;
    HEIGHT_CANVAS = 480;

    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    loadImage(path) {
        this.img = new Image(); // <img>
        this.img.src = path;
    }

    moveRight() {
        console.log("Move right");
    }

     moveLeft(){
        console.log("Chicken moves left");
    }
}