class  MoveableObject {
    x;
    y;
    img;
    height;
    width;
    HEIGHT_CANVAS = 480;
    imagesCache = {};
    speed = 0.1;
    end_position_x = -this.width;
    difference_of_position = 0;
    
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
    
    
    
    
    
    moveLeft(start_position_x){
        setInterval(() => {
            this.x = start_position_x - this.difference_of_position;
            this.difference_of_position += this.speed;
            if(this.x <= this.end_position_x){
                this.difference_of_position = 0;
                start_position_x = 720;
                
            }
        }, 1000 / 60); // 60 times per second
    }

    moveRight() {
        console.log("Move right");
    }
}