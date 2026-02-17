class World {
    HEALTH_STATUS_BAR_IMAGES = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    COINS_STATUS_BAR_IMAGES = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    BOTTLE_STATUS_BAR_IMAGES = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    character = new Character();
    statusBarHealth = new StatusBar(10, 0, this.HEALTH_STATUS_BAR_IMAGES, 100);
    statusBarCoins = new StatusBar(10, 40, this.COINS_STATUS_BAR_IMAGES, 0);
    statusBarBottles = new StatusBar(10, 80, this.BOTTLE_STATUS_BAR_IMAGES, 0);
    throwableObjects = [];
    level = level1;
    totalCoins = this.level.coins.length;
    
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
    
    }

    
    checkCollisions() {
        if (this.level instanceof Level) {
            this.level.enemies.forEach(enemy => {
                if (this.character.colliding_detecting && this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    this.character.checkIsDead();
                }
            });
            this.level.coins.forEach(coin => {
                if (this.character.colliding_detecting && this.character.isColliding(coin)) {
                    this.character.collectCoin();
                    this.statusBarCoins.setPercentage(this.character.coinsCollected / this.totalCoins * 100);
                    coin.colliding_detecting = false;
                    this.character.deleteCoin(coin);
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