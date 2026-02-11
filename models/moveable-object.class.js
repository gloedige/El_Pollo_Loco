class  MoveableObject extends DrawableObject {
    HEIGHT_CANVAS = 480;
    speed = 0.1;
    end_position_x;
    difference_of_position = 0;
    otherDirection = false;
    currentImageIndex = 0;
    speedY = 0;
    acceleration = 2.5;
    dead = false;
    lastHit = 0;
    colliding_detecting = true;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    energy = 100;
    
    constructor(x, y, img) {
        super();
        this.x = x;
        this.y = y;
        this.img = img;
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
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

    playDeadAnimation(imagePathsArr) {
        let i = this.currentImageIndex % imagePathsArr.length; // let I = 0 % 6
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
        this.currentImageIndex++;
        if (this.currentImageIndex >= imagePathsArr.length) {
            this.currentImageIndex = imagePathsArr.length - 1; // stop at the last frame
        }
        this.dead = true;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof Character) {
            return this.y < 450 - 280;
        }
        if (this instanceof ThrowableObject) {
            return true; 
        }
        else {
            return this.y < this.HEIGHT_CANVAS - this.height;
        }   
    }

    jump() {
        this.speedY = 28;
    }
    
    isColliding(movableObject) {
        return  this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
                this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
                this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < this.TIME_RESET_HURT;
    }

    checkIsDead() {
         if (this.energy == 0) {
            this.dead = true;
            this.colliding_detecting = false;
        }
    }
    
}