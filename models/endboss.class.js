/**
 * Represents the Endboss enemy in the game.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    ENDBOSS_WALKING_IMAGES = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    ENDBOSS_ALERT_IMAGES = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    ENDBOSS_ATTACK_IMAGES = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    ENDBOSS_JUMP_IMAGES = [
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png'
    ];
    ENDBOSS_HURT_IMAGES = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    ENDBOSS_DEAD_IMAGES = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    TIME_RESET_HURT = 1;
    GROUND_LEVEL_ENDBOSS = 30;
    ENDBOSS_START_X_POSITION = 4000;
    TOTAL_ENERGY = 50;
    energy = this.TOTAL_ENERGY;
    world;
    direction = 'left';
    offset = {
        top: 60,
        left: 30,
        right: 30,
        bottom: 50
    };
    isEndbossWalkingSoundPlaying = false;
    lastJumpTime = 0;
    JUMPCOOLDOWN = 2000;
    REACH_END_BOSS_X_POSITION = this.ENDBOSS_START_X_POSITION - 400;
    TURN_DIRECTION_DELAY = 1000;
    characterReachesEndboss = false;

    /**
     * Creates a new Endboss instance and initializes its properties.
     */
    constructor() {
        super().loadImage(this.ENDBOSS_ALERT_IMAGES[0]);
        this.x = this.ENDBOSS_START_X_POSITION;
        this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL_ENDBOSS - this.height;
        this.loadImages(this.ENDBOSS_ALERT_IMAGES);
        this.loadImages(this.ENDBOSS_WALKING_IMAGES);
        this.loadImages(this.ENDBOSS_ATTACK_IMAGES);
        this.loadImages(this.ENDBOSS_HURT_IMAGES);
        this.loadImages(this.ENDBOSS_DEAD_IMAGES);
        this.applyGravity();
        this.animate(this.ENDBOSS_ALERT_IMAGES, 10);
        this.otherDirection = false;
        this.speed = 10;
    }


    /**
     * Starts the endboss animation loop and movement.
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     * @param {number} speedAnimation - Animation speed (frames per second).
     */
    animate(imagePathsArr, speedAnimation) {
        let interval_moveEndboss = setInterval(() => this.autoMoveEndboss(), 1000/25);
        let interval_playEndboss = setInterval(() => this.playEndboss(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_moveEndboss);
        window.activeIntervals.push(interval_playEndboss);
    }


    /**
     * Handles automatic movement and actions of the endboss.
     */
    autoMoveEndboss() {
        if (this.dead) {
            return;
        }
        else if (this.startFinalFight()) {
            this.handleFollowCharacter();
            this.moveEndboss();
            this.handleJumping();
        }
    }


    /**
     * Handles endboss jumping logic and animation.
     */
    handleJumping() {
        this.jumpRandomly();
        if (this.isAboveGround() && !this.isHit()) {
            this.playMultiLoopAnimation(this.ENDBOSS_JUMP_IMAGES);
        }
    }


    /**
     * Plays the endboss animation depending on its state (dead, hurt, attacking, walking, or alert).
     * @param {string[]} imagePathsArr - Array of image paths for animation.
     */
    playEndboss(imagePathsArr) {
        if (this.dead) {
            this.playSingleLoopAnimation(this.ENDBOSS_DEAD_IMAGES);
        } else if (this.isHit()) {
            this.playMultiLoopAnimation(this.ENDBOSS_HURT_IMAGES);
            this.world.sounds.playEnemyIsHitSound();
        } else if (this.isColliding(this.world.character) && !this.isAboveGround()) {
            this.playMultiLoopAnimation(this.ENDBOSS_ATTACK_IMAGES);
        } else if (this.startFinalFight() && !this.isAboveGround()) {
            this.playMultiLoopAnimation(this.ENDBOSS_WALKING_IMAGES);
            this.playEndbossIsWalkingSound();
        } else if (!this.startFinalFight()){
            this.hasReachedEndboss();
            this.playMultiLoopAnimation(imagePathsArr);
        }
    }


    /**
     * Plays the endboss walking sound if not already playing.
     */
    playEndbossIsWalkingSound() {
        if (!this.isEndbossWalkingSoundPlaying && this.world && this.world.sounds) {
            this.isEndbossWalkingSoundPlaying = true;
            this.world.sounds.WALKING_ENDBOSS_SOUND.volume = 0.5;
            this.world.sounds.WALKING_ENDBOSS_SOUND.muted = window.isMuted || false;
            this.world.sounds.WALKING_ENDBOSS_SOUND.play();
            this.world.sounds.WALKING_ENDBOSS_SOUND.loop = true;
        }
    }


    /**
     * Stops the endboss walking sound and resets its state.
     */
    stopEndbossWalkingSound() {
        if (this.world && this.world.sounds) {
            this.world.sounds.WALKING_ENDBOSS_SOUND.loop = false;
            this.world.sounds.WALKING_ENDBOSS_SOUND.pause();
            this.world.sounds.WALKING_ENDBOSS_SOUND.currentTime = 0;
        }
    }


    /**
     * Determines if the final fight with the endboss should start.
     * @returns {boolean}
     */
    startFinalFight() {
        return this.characterReachesEndboss && !(this.world.character && this.world.character.dead);
    }


    /**
     * Moves the endboss left or right based on direction.
     */
    moveEndboss() {
        if (!this.otherDirection){
            this.x -= this.speed;
    
        }
        else {
            this.x += this.speed;
        }
    }


    /**
     * This functino makes the endboss follow the character by changing its direction 
     * based on the character's position.
     * It is called in the autoMoveEndboss function to continuously update the endboss's direction as it moves.
     */
    handleFollowCharacter() {
        if (this.world && this.world.character) {
            if (this.world.character.x < this.x) {
                setTimeout(() => {
                    this.otherDirection = false;
                }, this.TURN_DIRECTION_DELAY); 
            } else {
                setTimeout(() => {
                    this.otherDirection = true;
                }, this.TURN_DIRECTION_DELAY); 
            }
        }
    }


    /**
     * Checks if the character has reached the endboss and updates state.
     */
    hasReachedEndboss() {
        if (this.world && this.world.character && this.world.character.x >= this.REACH_END_BOSS_X_POSITION) {
            this.characterReachesEndboss = true;
        }
    }
}