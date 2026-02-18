class World {
    character = new Character();
    statusBarHealth = new StatusBar(10, 0, 'health', 100);
    statusBarCoins = new StatusBar(10, 40, 'coins', 0);
    statusBarBottles = new StatusBar(10, 80, 'bottles', 0);
    throwableObjects = [];
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
        this.run();
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
        setInterval(() => {
            this.checkJumpingOnTop();
        }, 16);
    
    }

    
    checkCollisions() {
        if (this.level instanceof Level) {
            this.level.enemies.forEach(enemy => {
                if (this.character.colliding_detecting && this.character.isColliding(enemy) && !this.character.isJumpingOnTop(enemy) && !enemy.dead) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    this.character.checkIsDead();
                }
            });
            this.level.coins.forEach(coin => {
                if (this.character.colliding_detecting && this.character.isColliding(coin)) {
                    this.character.collectCoin();
                    this.statusBarCoins.setPercentage(this.character.coinsCollected / numberOfCoins * 100);
                    coin.colliding_detecting = false;
                    this.character.deleteElement(coin);
                }
            });
            this.level.bottles.forEach(bottle => {
                if (this.character.colliding_detecting && this.character.isColliding(bottle)) {
                    this.character.collectBottles();
                    this.statusBarBottles.setPercentage(this.character.bottlesCollected / numberOfBottles * 100);
                    console.log(this.character.bottlesCollected);
                    bottle.colliding_detecting = false;
                    this.character.deleteElement(bottle);                    
                }
            });




            // this.throwableObjects.forEach(bottle => {
            //     this.level.enemies.forEach(enemy => {
            //         if (bottle.colliding_detecting && bottle.isColliding(enemy)) {
            //             enemy.hit();
            //             bottle.colliding_detecting = false;
            //             const index = this.throwableObjects.indexOf(bottle);
            //             if (index > -1) {
            //                 this.throwableObjects.splice(index, 1);
            //             }
            //         }
            //     });
            // });
        }
    }
    

    checkJumpingOnTop() {
        if (this.level instanceof Level) {
            this.level.enemies.forEach(enemy => {
                if (this.character.colliding_detecting && this.character.isColliding(enemy) && this.character.isJumpingOnTop(enemy) && !enemy.dead) {
                    enemy.hit();
                    this.character.speedY = 20;
                    enemy.checkIsDead();
                    enemy.colliding_detecting = false;
                    if (enemy.energy == 0) {
                        enemy.killedEnemy();
                    }
                }
            });
        }
    }


    
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottlesCollected > 0) {;
            let bottle = new ThrowableObject(this.character.x + this.character.width/2, this.character.y + this.character.height / 3, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.removeCollectedBottle();
        }
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        let relationOfCameraToBackground = this.camera_x % (this.widthOfSingleBackground - this.positionCharacterInWorld_x );
        
        if (this.level instanceof Level) {
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
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
        }
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        
        let self = this;
        requestAnimationFrame(() => self.draw());
        
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects like status bar //
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
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

        drawableObject.draw(this.ctx);
        if (!(drawableObject instanceof StatusBar)) {
            drawableObject.drawFrame(this.ctx);
        }        

        if (!(drawableObject instanceof StatusBar) && drawableObject.otherDirection) {
            this.flipImageBack(drawableObject);
        }

    }
    
    
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
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