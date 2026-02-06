class  MoveableObject {
    x;
    y;
    img;
    height;
    width;
    HEIGHT_CANVAS = 480;
    imagesCache = {};
    speed = 0.1;
    end_position_x;
    difference_of_position = 0;
    otherDirection = false;
    currentImageIndex = 0;
    
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
    
    
    autoMoveLeft(start_position_x, width_object) {
        this.x = start_position_x;
        this.end_position_x = -width_object;
        setInterval(() => {
            this.x -= this.speed;
            if(this.x <= this.end_position_x){
                start_position_x = 720; // reset to the right edge of the canvas
                this.x = start_position_x;
                
            }
        }, 1000 / 60); // 60 times per second
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    playAnimation(imagePathsArr) {
        let i = this.currentImageIndex % imagePathsArr.length; // let I = 0 % 6
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
    }
}