class World {
    character = new Character();
    level = level1;
    
    start_background_x_1 = 0;
    start_background_x_2 = 719;
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
        this.checkCollisions();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.colliding_detecting && this.character.isColliding(enemy)) {
                    this.character.energy -= 10;
                    console.log('Character energy: ', this.character.energy);
                    if (this.character.energy <= 0) {
                        this.character.dead = true;
                        this.character.colliding_detecting = false;
                    }
                }
            });
        }, 500);
    }
    
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        let relationOfCameraToBackground = this.camera_x % (this.widthOfSingleBackground - this.positionCharacterInWorld_x );
        if (relationOfCameraToBackground == 0) {
            this.start_background_x_1 += this.widthOfSingleBackground * 2;
            this.start_background_x_2 += this.widthOfSingleBackground * 2;
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/air.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/air.png', this.start_background_x_2));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', this.start_background_x_2));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', this.start_background_x_2));
            this.level.backgroundObjects.push(new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', this.start_background_x_2));
        }
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
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

        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);

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