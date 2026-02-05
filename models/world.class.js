class World {
    character = new Character();
    enemies = level1.enemies;
    start_background_x_1 = 0;
    start_background_x_2 = 719;
    backgroundObjects = level1.backgroundObjects;
    clouds = level1.clouds; 

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    positionCharacterInWorld_x = 30;
    widthOfSingleBackground = 719;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }
    
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        let relationOfCameraToBackground = this.camera_x % (this.widthOfSingleBackground - this.positionCharacterInWorld_x );
        if (relationOfCameraToBackground == 0) {
            this.start_background_x_1 += this.widthOfSingleBackground * 2;
            this.start_background_x_2 += this.widthOfSingleBackground * 2;
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/air.png', this.start_background_x_1));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', this.start_background_x_1));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', this.start_background_x_1));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', this.start_background_x_1));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/air.png', this.start_background_x_2));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', this.start_background_x_2));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', this.start_background_x_2));
            this.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', this.start_background_x_2));
        }
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        
        let self = this;
        requestAnimationFrame(() => self.draw());

        this.ctx.translate(-this.camera_x, 0);
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
        
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }
    
    
    setWorld() {
        this.character.world = this;
    }
    
    
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }
    
    flipImageBack(movableObject) {
        this.ctx.restore();
        movableObject.x = movableObject.x * -1;
    }
}