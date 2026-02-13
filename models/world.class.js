class World {
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = [];
    level = level1;
    
    start_background_x_1 = 0;
    start_background_x_2 = 719 * 2;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    positionCharacterInWorld_x = 30;
    totalBackgroundWidth = 719 * 2;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    
    }

    
    checkCollisions() {
        if (this.level instanceof Level) {
            this.level.enemies.forEach(enemy => {
                if (this.character.colliding_detecting && this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    this.character.checkIsDead();
                }
            });
        }
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + this.character.height / 3);
            this.throwableObjects.push(bottle);
        }
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        
        if (this.level instanceof Level) {           
            this.animateBackground(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);
        }
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        
        let self = this;
        requestAnimationFrame(() => self.draw());
        
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects like status bar //
        this.addToMap(this.statusBar);
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(drawableObject) {
        if (!(drawableObject instanceof StatusBar) && drawableObject.otherDirection) {
            this.flipImage(drawableObject);
        }

        // Draw the main image only once; seamless looping is handled by having two objects in the array
        drawableObject.draw(this.ctx);
        if (!(drawableObject instanceof StatusBar)) {
            drawableObject.drawFrame(this.ctx);
        }
        if (!(drawableObject instanceof StatusBar) && drawableObject.otherDirection) {
            this.flipImageBack(drawableObject);
        }
    }

    // Function to parallax scroll the background
    updateBackgroundPosition(backgroundObject) {
        if (this.character.isMoving()) {
            let character_speed = this.character.speed;
            let speed_factor = backgroundObject.parallaxSpeed || 1;
            
            
            if (this.character.otherDirection){
                character_speed = -character_speed;
            }


            if (backgroundObject.xPositions[0] + this.camera_x < -this.totalBackgroundWidth) {
                backgroundObject.xPositions[0] = this.totalBackgroundWidth - speed_factor * character_speed + backgroundObject.xPositions[1];
            } else {
                backgroundObject.xPositions[0] -= character_speed * speed_factor;
            }

            if (backgroundObject.xPositions[1] + this.camera_x < -this.totalBackgroundWidth) {
                backgroundObject.xPositions[1] = this.totalBackgroundWidth - speed_factor * character_speed + backgroundObject.xPositions[0];
            } else {
                backgroundObject.xPositions[1] -= character_speed * speed_factor;
            }
        }
    }

    animateBackground(objects) {
        // let speed_factor = 0;
            objects.forEach((backgroundObject) => {
                if (backgroundObject instanceof BackgroundObject) {
                    this.updateBackgroundPosition(backgroundObject);
                    this.addToMap(backgroundObject);
                }
            });
        
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