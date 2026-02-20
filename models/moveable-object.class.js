class  MoveableObject extends DrawableObject {
    HEIGHT_CANVAS = 480;
    speed = 0.1;
    end_position_x;
    difference_of_position = 0;
    
    currentImageIndex = 0;
    speedY = 0;
    acceleration = 2.5;
    dead = false;
    lastHit = 0;
    colliding_detecting = true;
    coinsCollected = 0;
    bottlesCollected = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    WALKING_ENDBOSS_SOUND = './audio/walking_endboss_sound.mp3';
    JUMP_SOUND = './audio/cartoon_jump_sound_short.mp3';
    ENEMY_HIT_SOUND = './audio/chicken_is_dead_sound.mp3';
    CHARACTER_HIT_SOUND = './audio/character_hurt_sound.mp3';

    energy = 100;
    endboss_is_walking_sound = new Audio(this.WALKING_ENDBOSS_SOUND);
    isJumpingSoundPlaying = false;
    isEnemyHitSoundPlaying = false;
    isCharacterHitSoundPlaying = false;
    isEndbossWalkingSoundPlaying = false;
    
    constructor(x, y, img) {
        super();
        this.x = x;
        this.y = y;
        this.img = img;
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
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
        let interval_autoMoveLeft = setInterval(() => {
            this.x -= this.speed;
            if(this.x <= this.end_position_x){
                start_position_x = 720; // reset to the right edge of the canvas
                this.x = start_position_x;
            }
        }, 1000 / 60); // 60 times per second
        window.activeIntervals.push(interval_autoMoveLeft);
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
        // this.dead = true;
    }

    applyGravity() {
        let interval_gravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        window.activeIntervals.push(interval_gravity);
    }

    isAboveGround() {
        if (this instanceof Character) {
            return this.y < 430 - 250;
        }
        if (this instanceof ChickenSmall) {
            return this.y < 430 - 60;
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

    isJumpingOnTop(movableObject) {
        return  this.y + this.height - this.offset.bottom < movableObject.y + movableObject.height/2 &&
                this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.speedY < 0;
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

    isHit() {
        return this.isHurt() && !this.dead;
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
            this.killedEnemy();
            if (this instanceof Chicken) this.playEnemyIsHitSound();
        }
        if (this instanceof Character && this.dead) {
            this.stopIntervalEndbossWalking();
            setTimeout(() => { 
                showGameOverScreen();
            }, 1000);
        }
        else if (this instanceof Endboss && this.dead && !(this.world.character && this.world.character.dead)) {
            this.stopIntervalEndbossWalking();
            setTimeout(() => {
                showYouWinScreen();
            }, 1000);
        }
    }

    stopIntervalEndbossWalking() {
        this.stopEndbossWalkingSound();
        // clearInterval window.activeIntervals interval_playEndboss
        window.activeIntervals.forEach(interval => {
            if (interval === this.interval_playEndboss) {
                clearInterval(interval);
            }
        });
    }

    collectCoin() {
        this.coinsCollected = (this.coinsCollected || 0) + 1;
    }

    deleteElement(element) {
        if (element instanceof Coin) {
            const index = this.world.level.coins.indexOf(element);
            if (index > -1) {            
                this.world.level.coins.splice(index, 1);
            }
        }
        else if (element instanceof Bottle) {
            const index = this.world.level.bottles.indexOf(element);
            if (index > -1) {            
                this.world.level.bottles.splice(index, 1);
            }
        }
    }

    selectRandomImage(imagePathsArr) {
        let i = Math.floor(Math.random() * imagePathsArr.length);
        let path = imagePathsArr[i];
        this.img = this.imagesCache[path];
    }

    collectBottles() {
        this.bottlesCollected = (this.bottlesCollected || 0) + 1;
    }

    removeCollectedBottle() {
        if (this.bottlesCollected > 0) {
            this.bottlesCollected--;
        }
    }

    killedEnemy() {
        this.speed = 0;
    }

    hasReachedEndboss() {
        if (this.world && this.world.character) {
            return this.world.character.x >= 2880;
        }
        return false;
    }

    playJumpSound() {
        if (!this.isJumpingSoundPlaying) {
            this.isJumpingSoundPlaying = true;
            let jump_sound = new Audio(this.JUMP_SOUND);
            jump_sound.volume = 0.5;
            jump_sound.muted = window.isMuted || false;
            jump_sound.play();
            jump_sound.onended = () => this.isJumpingSoundPlaying = false;
        }
    }

    playEnemyIsHitSound() {
        if (!this.isEnemyHitSoundPlaying) {
            this.isEnemyHitSoundPlaying = true;
            let enemy_is_hit_sound = new Audio(this.ENEMY_HIT_SOUND);
            enemy_is_hit_sound.volume = 0.5;
            enemy_is_hit_sound.muted = window.isMuted || false;
            enemy_is_hit_sound.play();
            enemy_is_hit_sound.onended = () => this.isEnemyHitSoundPlaying = false;
        }
    }

    playCharacterIsHitSound() {
        if (!this.isCharacterHitSoundPlaying) {
            this.isCharacterHitSoundPlaying = true;
            let character_is_hit_sound = new Audio(this.CHARACTER_HIT_SOUND);
            character_is_hit_sound.volume = 0.5;
            character_is_hit_sound.muted = window.isMuted || false;
            character_is_hit_sound.play();
            character_is_hit_sound.onended = () => this.isCharacterHitSoundPlaying = false;
        }
    }

    playEndbossIsWalkingSound() {
        if (!this.isEndbossWalkingSoundPlaying && !(this.world.character && this.world.character.dead)) {
            this.isEndbossWalkingSoundPlaying = true;
            this.endboss_is_walking_sound.volume = 0.5;
            this.endboss_is_walking_sound.muted = window.isMuted || false;
            this.endboss_is_walking_sound.play();
            this.endboss_is_walking_sound.loop = true;
        }
    }

    stopEndbossWalkingSound() {
        this.endboss_is_walking_sound.loop = false;
        this.endboss_is_walking_sound.pause();
        this.endboss_is_walking_sound.currentTime = 0;
    }

}