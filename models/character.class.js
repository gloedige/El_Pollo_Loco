/**
 * Character class represents the main character in the game, handling movement, animations, and interactions.
 */
class Character extends MoveableObject {
    width = 140;
    CHARACTER_IDLE_SHORT_IMAGES = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    CHARACTER_IDLE_LONG_IMAGES = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    CHARACTER_WALKING_IMAGES = [
            './img/2_character_pepe/2_walk/W-21.png',
            './img/2_character_pepe/2_walk/W-22.png',
            './img/2_character_pepe/2_walk/W-23.png',
            './img/2_character_pepe/2_walk/W-24.png',
            './img/2_character_pepe/2_walk/W-25.png',
            './img/2_character_pepe/2_walk/W-26.png'
        ];
    CHARACTER_JUMPING_PART_1_IMAGES = [
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png'
    ];
    CHARACTER_JUMPING_PART_2_IMAGES = [
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    CHARACTER_HURT_IMAGES = [
         './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    CHARACTER_DEAD_IMAGES = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];
    TIME_RESET_HURT = 1.5;
    SLEEP_TIME_THRESHOLD = 15000;
    world;
    speed = 6;
    TOTAL_ENERGY = 200;
    energy = this.TOTAL_ENERGY;
    lastThrowTime = 0;
    TIME_RESET_THROW = 1000;
    offset = {
        top: 120,
        left: 40,
        right: 40,
        bottom: 20
    };
    lastMoveTime = new Date().getTime();
    hasFallingAnimationStarted = false;
    isJumping = false;
    isCharacterSleepingSoundPlaying = false;
    isCharacterHitSoundPlaying = false;
    isAttacking = false;

        
    /**
     * Creates a new Character instance, loads images, sets initial position, and starts animation.
     */
    constructor() {
        super().loadImage(this.CHARACTER_WALKING_IMAGES[0]);
        this.height = 250;
        this.x = 100;
        this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL - this.height; // ground level for character
        this.loadImages(this.CHARACTER_IDLE_SHORT_IMAGES);
        this.loadImages(this.CHARACTER_IDLE_LONG_IMAGES);
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.CHARACTER_JUMPING_PART_1_IMAGES);
        this.loadImages(this.CHARACTER_JUMPING_PART_2_IMAGES);
        this.loadImages(this.CHARACTER_HURT_IMAGES);
        this.loadImages(this.CHARACTER_DEAD_IMAGES);
        this.animate(this.CHARACTER_WALKING_IMAGES, 10);
        this.applyGravity();
    }


    /**
     * Updates the last move time to the current time.
     */
    setLastMoveTime() {
        this.lastMoveTime = new Date().getTime();
    }
    
    
    /**
     * Starts character movement and animation intervals.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     * @param {number} speedAnimation - Animation speed.
     */
    animate(imagePathsArr, speedAnimation) {
        let interval_moveCharacter = setInterval(() => this.moveCharacter(), 1000/60);        
        let interval_playCharacter = setInterval(() => this.playCharacter(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_moveCharacter, interval_playCharacter);
    }
    

    /**
     * Plays sleeping animation and sound if character is inactive.
     */
    sleepCharacter() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastMoveTime > this.SLEEP_TIME_THRESHOLD) { // 15 seconds of inactivity
            this.playMultiLoopAnimation(this.CHARACTER_IDLE_LONG_IMAGES);
            this.playCharacterIsSleepingSound();
        }
        else {
            this.playMultiLoopAnimation(this.CHARACTER_IDLE_SHORT_IMAGES);
        }
    }

    
    /**
     * Handles character movement based on keyboard input and updates camera position.
     */
    moveCharacter() {
        if (this.dead) return;
        if (this.canMoveRight()) this.handleCharacterMoveRight();
        if (this.canMoveLeft()) this.handleCharacterMoveLeft();
        if (this.canJump()) this.handleCharacterJump();
        if (this.canFallDown()) this.handleCharacterCanFallDown();
        else this.hasFallingAnimationStarted = false;
        this.world.camera_x = -this.x + 100;
    }

    
    /**
     * Plays the appropriate animation based on character state.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     */
    playCharacter(imagePathsArr) {
        if (this.checkCharacterIsJumping()) this.handleJumpAnimations();
        else if (this.isFallingDown()) this.handleFallingDownAnimations();
        else if (this.isMoving()) this.handleIsMovingAnimations(imagePathsArr);
        else if (this.dead) this.handleDeadAnimations();
        else if (this.isHit()) this.handleCharacterIsHitAnimations();
        else this.sleepCharacter();
    }


    /**
     * Moves character right and updates last move time.
     */
    handleCharacterMoveRight() {
        this.moveRight();
        this.setLastMoveTime();
    }


    /**
     * Moves character left and updates last move time.
     */
    handleCharacterMoveLeft() {
        this.moveLeft();
        this.setLastMoveTime();
    }


    /**
     * Handles character jump, plays jump sound, and updates state.
     */
    handleCharacterJump() {
        this.currentImageIndex = 0;
        this.canFallDownState = true;
        this.world.sounds.playJumpSound();
        this.jump();
        this.isJumping = true;
        this.setLastMoveTime();
    }


    /**
     * Handles character falling down animation and state.
     */
    handleCharacterCanFallDown() {
        if (!this.hasFallingAnimationStarted) {
            this.currentImageIndex = 0;
            this.isJumping = false;
            this.hasFallingAnimationStarted = true;
        }
    }
    

    /**
     * Plays dead animation and stops sleeping sound.
     */
    handleDeadAnimations() {
        this.playSingleLoopAnimation(this.CHARACTER_DEAD_IMAGES);
        this.stopCharacterSleepingSound();
    }


    /**
     * Plays hit animation, stops sleeping sound, and plays hit sound.
     */
    handleCharacterIsHitAnimations() {
        this.playMultiLoopAnimation(this.CHARACTER_HURT_IMAGES);
        this.stopCharacterSleepingSound();
        this.playCharacterIsHitSound();
    }


    /**
     * Checks if character is jumping upwards.
     * @returns {boolean}
     */
    checkCharacterIsJumping() {
        return this.isJumping && this.speedY > 0;
    }


    /**
     * Plays jump animation and stops sleeping sound.
     */
    handleJumpAnimations() {
        this.playSingleLoopAnimation(this.CHARACTER_JUMPING_PART_1_IMAGES);
        this.stopCharacterSleepingSound();
    }


    /**
     * Plays falling down animation and stops sleeping sound.
     */
    handleFallingDownAnimations() {
        this.playSingleLoopAnimation(this.CHARACTER_JUMPING_PART_2_IMAGES);
        this.stopCharacterSleepingSound();
    }


    /**
     * Plays moving animation and stops sleeping sound.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     */
    handleIsMovingAnimations(imagePathsArr) {
        this.playMultiLoopAnimation(imagePathsArr);
        this.stopCharacterSleepingSound();
    }


    /**
     * Checks if character can move right.
     * @returns {boolean}
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    };


    /**
     * Checks if character can move left.
     * @returns {boolean}
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.level_start_x;
    };


    /**
     * Checks if character can jump.
     * @returns {boolean}
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    /**
     * Checks if character can fall down.
     * @returns {boolean}
     */
    canFallDown() {
        return this.isAboveGround() && (this.speedY <= 0);
    }


    /**
     * Checks if character is falling down.
     * @returns {boolean}
     */
    isFallingDown() {
        return this.isAboveGround() && !this.dead && this.speedY < 0;
    }


    /**
     * Checks if character is moving.
     * @returns {boolean}
     */
    isMoving() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.dead && !this.isAboveGround() && !this.isHurt();
    }


    /**
     * Plays character hit sound if not already playing.
     */
    playCharacterIsHitSound() {
        if (!this.isCharacterHitSoundPlaying) {
            this.isCharacterHitSoundPlaying = true;
            this.world.sounds.CHARACTER_HIT_SOUND.volume = 0.5;
            this.world.sounds.CHARACTER_HIT_SOUND.muted = window.isMuted || false;
            this.world.sounds.CHARACTER_HIT_SOUND.play();
            this.world.sounds.CHARACTER_HIT_SOUND.onended = () => this.isCharacterHitSoundPlaying = false;
        }
    }


    /**
     * Plays character sleeping sound if not already playing.
     */
    playCharacterIsSleepingSound() {
        if (!this.isCharacterSleepingSoundPlaying) {
            this.isCharacterSleepingSoundPlaying = true;
            this.world.sounds.CHARACTER_SLEEPING_SOUND.volume = 0.5;
            this.world.sounds.CHARACTER_SLEEPING_SOUND.muted = window.isMuted || false;
            this.world.sounds.CHARACTER_SLEEPING_SOUND.play();
            this.world.sounds.CHARACTER_SLEEPING_SOUND.onended = () => this.isCharacterSleepingSoundPlaying = false;
        }
    }


    /**
     * Stops character sleeping sound if playing.
     */
    stopCharacterSleepingSound() {
        if (this.world && this.world.sounds && this.isCharacterSleepingSoundPlaying) {
            this.world.sounds.CHARACTER_SLEEPING_SOUND.pause();
            this.world.sounds.CHARACTER_SLEEPING_SOUND.currentTime = 0;
            this.isCharacterSleepingSoundPlaying = false;
        }
    }


    /**
     * Checks if character is jumping on top of another object.
     * @param {MoveableObject} movableObject - The object to check against.
     * @returns {boolean}
     */
    isJumpingOnTop(movableObject) {
        return  this.y + this.height - this.offset.bottom < movableObject.y + movableObject.height/2 &&
                this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
                this.speedY < 0;
    }


    /**
     * Increments the number of coins collected by the character.
     */
    collectCoin() {
        this.coinsCollected = (this.coinsCollected || 0) + 1;
    }


    /**
     * Increments the number of bottles collected by the character.
     */
    collectBottles() {
        this.bottlesCollected = (this.bottlesCollected || 0) + 1;
    }


    /**
     * Decrements the number of bottles collected if greater than zero.
     */
    removeCollectedBottle() {
        if (this.bottlesCollected > 0) this.bottlesCollected--;
    }


    /**
     * Checks if enough time has passed since the last throw to allow another.
     * @returns {boolean}
     */
    allowThrow() {
        let currentTime = new Date().getTime();
        let timeSinceLastThrow = currentTime - this.lastThrowTime;
        if (timeSinceLastThrow > this.TIME_RESET_THROW) return true;
        return false;
    }


    /**
     * This function is called when the character throws a bottle. It sets 
     * the attacking state to true, updates the last move time, and resets the 
     * attacking state after a short delay.
     */
    attack() {
        this.isAttacking = true;
        this.setLastMoveTime();
        setTimeout(() => this.isAttacking = false, 500);
    } 
}