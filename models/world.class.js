/**
 * Represents the game world, managing the main game loop, rendering, and interactions.
 */
class World {
    level = level1;
    character = new Character();
    statusBarCoins = new StatusBar(10, 40, 'coins', 0, numberOfCoins);
    statusBarBottles = new StatusBar(10, 80, 'bottles', 0, numberOfBottles);
    statusBarHealth = new StatusBar(10, 0, 'health', this.character.TOTAL_ENERGY, this.character.energy);
    statusBarEndboss = new StatusBar(500, 85, 'endboss', this.getTotalEnergyOfEndboss(), this.getEndbossEnergy());
    throwableObjects = [];
    
    start_background_x_1 = 0;
    start_background_x_2 = 719;
    canvas;
    ctx;
    keyboard;
    sounds;
    camera_x = 0;
    positionCharacterInWorld_x = 100;
    widthOfSingleBackground = 719;
    runningFlag = true;
    animationFrameId;
 

    /**
     * Creates a new World instance and initializes the game.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     * @param {Object} sounds - The sounds manager.
     */
    constructor(canvas, keyboard, sounds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sounds = sounds;
        this.get_coin_sound = this.sounds.GET_COIN_SOUND;
        this.get_bottle_sound = this.sounds.GET_BOTTLE_SOUND;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This function retrieves the current energy of the endboss from the level's enemies array.
     * @returns {number} The current energy of the endboss.
     */
    getEndbossEnergy() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss).energy;
    }


    /**
     * This function is called when the game ends, either by the character's death or by defeating the endboss.
     * @returns {number} The total energy of the endboss, used for resetting the status bar if the player wins.
     */
    getTotalEnergyOfEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss).TOTAL_ENERGY;
    }


    /**
     * Starts the main game loop and collision checks.
     */
    run(){
        let interval_checkCollisions = setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionsHandler();
        }, 1000/30);
        let interval_checkJumpingOnTop = setInterval(() => {
            this.checkJumpingOnTop();
            this.checkHitByBottle();
        }, 1000/60);
        window.activeIntervals.push(interval_checkCollisions, interval_checkJumpingOnTop);
    }


    /**
     * Handles all collision checks in the world.
     */
    checkCollisionsHandler() {
        if (this.level instanceof Level) {
            this.handleCollisionsWithEnemies();
            this.handleCollisionWithCoins();
            this.handleCollisionWithBottles();
        }
    }


    /**
     * Handles collisions between the character and enemies.
     */
    handleCollisionsWithEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.colliding_detecting && this.character.isColliding(enemy) && !this.character.isJumpingOnTop(enemy) && !this.character.isInvulnerable && !enemy.dead && !this.character.isHit()) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.character.checkIsDead();
            };
        });
    }


    /**
     * Handles collisions between the character and coins.
     */
    handleCollisionWithCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.colliding_detecting && this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.playCollectCoinSound();
                this.statusBarCoins.setPercentage(this.character.coinsCollected);
                coin.colliding_detecting = false;
                this.character.deleteElement(coin);
            };
        });
    }


    /**
     * Handles collisions between the character and bottles.
     */
    handleCollisionWithBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.colliding_detecting && this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.playCollectBottleSound();
                this.updateStatusBarBottles();
                    bottle.colliding_detecting = false;
                    this.character.deleteElement(bottle);                    
                }
            });
    }


    /**
     * Checks if the character is jumping on top of an enemy.
     */
    checkJumpingOnTop() {
        if (this.level instanceof Level) {
            this.level.enemies.forEach(enemy => {
                if (this.character.colliding_detecting && this.character.isColliding(enemy) && this.character.isJumpingOnTop(enemy) && !enemy.dead) {
                    enemy.hit();
                    this.character.activateInvulnerability();
                    this.character.speedY = 20;
                    enemy.checkIsDead();
                    enemy.colliding_detecting = false;
                }
            });
        }
    }


    /**
     * Checks if an enemy is hit by a thrown bottle.
     */
    async checkHitByBottle() {
        if (!(this.level instanceof Level)) return;
        for (const bottle of this.throwableObjects) {
            if (!bottle.colliding_detecting) continue;
            for (const enemy of this.level.enemies) {
                if (bottle.colliding_detecting && bottle.isColliding(enemy) && !enemy.dead) {
                    await this.handleHitByBottle(bottle, enemy);
                    break;
                }
            }
        }
    }


    /** 
     * This function handles the logic when an enemy is hit by a thrown bottle.
     * @param {ThrowableObject} bottle - The thrown bottle that hit the enemy.
     * @param {Enemy} enemy - The enemy that was hit by the bottle.
     * @return {Promise} A promise that resolves when the bottle splash animation is complete and the bottle is removed from the world.
     */
    async handleHitByBottle(bottle, enemy) {
        bottle.colliding_detecting = false;
        enemy.hit();
        enemy.checkIsDead();
        bottle.stopBottleMovement();
        await bottle.handleBottleSplash();
        this.handleDeleteThrowableObject(bottle);
        this.statusBarEndboss.setPercentage(this.getEndbossEnergy());
    }


    /**
     * Removes a throwable object (bottle) from the world.
     * @param {ThrowableObject} bottle - The bottle to remove.
     */
    handleDeleteThrowableObject(bottle) {
        setTimeout(() => {
            const index = this.throwableObjects.indexOf(bottle);
            if (index > -1) {
                this.throwableObjects.splice(index, 1);
            }    
        }, 0);
    }


    /**
     * Checks if the player throws a bottle.
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottlesCollected > 0 && this.character.allowThrow()) {;
            let bottle = new ThrowableObject(this.character.x + this.character.width/2, this.character.y + this.character.height / 3, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.removeCollectedBottle();
            this.character.attack();
            this.updateStatusBarBottles();
            this.character.lastThrowTime = new Date().getTime();
        }
    }


    /**
     * Updates the status bar for bottles.
     */
    updateStatusBarBottles() {
        this.statusBarBottles.setPercentage(this.character.bottlesCollected);
    }


    /**
     * Plays the sound for collecting a coin.
     */
    playCollectCoinSound() {;
        this.get_coin_sound.currentTime = 0;
        this.get_coin_sound.volume = 0.5;
        this.get_coin_sound.muted = window.isMuted || false;
        this.get_coin_sound.play();
    }


    /**
     * Plays the sound for collecting a bottle.
     */
    playCollectBottleSound() {
        this.get_bottle_sound.currentTime = 0;
        this.get_bottle_sound.volume = 0.5;
        this.get_bottle_sound.muted = window.isMuted || false;
        this.get_bottle_sound.play();
    }


    /**
     * Draws the game world and all objects.
     */
    draw() {
        if (!this.runningFlag) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.renderLevelElements();
        this.renderBottlesInAir();
        this.ctx.restore();
        this.renderStatusBars();
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.renderCharacter();
        this.ctx.restore();
        let self = this;
        if (this.runningFlag) {
            this.saveAnimationFrameId(requestAnimationFrame(() => self.draw()));
        }
    }

    
    /**
     * Saves the ID of the last animation frame to be able to stop it when the game ends.
     * @param {number} id - The ID of the animation frame.
     */
    saveAnimationFrameId(id) {
        this.animationFrameId = id;
    }
    
    
    /**
     * Renders all elements of the level, including background layers, clouds, enemies, coins, and bottles.
     */
    renderLevelElements() {
        if (this.level instanceof Level) {
            this.renderBackgroundLayers();
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
        }
    }


    /**
     * Checks if the character has reached the endboss and updates the state accordingly.
     */
    renderBottlesInAir() {
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Renders the character on the map.
     */
    renderCharacter() {
        this.addToMap(this.character);
    }


    /**
     * Renders the status bars for health, coins, and bottles.
     */
    renderStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    }

    
    /**
     * This function calculates the relation of the camera's x position to the character's 
     * position in the world, which is used for rendering background layers.
     * @returns {number} The relation of the camera's x position to the character's position.
     */
    getRelationOfCameraToCharacter() {
        return this.camera_x % (this.widthOfSingleBackground - this.positionCharacterInWorld_x);
    }


    /**
     * This function renders the background layers of the level, adding new layers as the camera moves to 
     * create a continuous scrolling effect.
     */
    renderBackgroundLayers() {
        let relationOfCameraToBackground = this.getRelationOfCameraToCharacter();
        if (relationOfCameraToBackground == 0) {
            this.start_background_x_1 += this.widthOfSingleBackground * 2;
            this.start_background_x_2 += this.widthOfSingleBackground * 2;
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/air.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', this.start_background_x_1));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/air.png', this.start_background_x_2));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', this.start_background_x_2));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', this.start_background_x_2));
            this.level.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', this.start_background_x_2));
        }
    }


    /**
     * Adds an array of drawable objects to the map.
     * @param {DrawableObject[]} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Adds a single drawable object to the map.
     * @param {DrawableObject} drawableObject - The object to add.
     */
    addToMap(drawableObject) {
        if (!(drawableObject instanceof StatusBar) && drawableObject.otherDirection) {
            this.flipImage(drawableObject);
        }

        drawableObject.draw(this.ctx);

        if (!(drawableObject instanceof StatusBar) && drawableObject.otherDirection) {
            this.flipImageBack(drawableObject);
        }
    }


    /**
     * Sets up world references for character, sounds, and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.sounds.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss || enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                enemy.world = this;
            }
        });
    }


    /**
     * Flips the image of a moveable object for left direction.
     * @param {MoveableObject} movableObject - The object to flip.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    /**
     * Restores the image orientation after flipping.
     * @param {MoveableObject} movableObject - The object to restore.
     */
    flipImageBack(movableObject) {
        this.ctx.restore();
        movableObject.x = movableObject.x * -1;
    }


    /**
     * This function stops the main game loop by setting the running flag to false and 
     * canceling the animation frame. It is called when the character dies or when the 
     * endboss is defeated.
     */
    stop() {
        this.runningFlag = false;
        cancelAnimationFrame(this.animationFrameId);
    }
}