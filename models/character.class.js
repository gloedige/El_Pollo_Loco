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
        './img/2_character_pepe/3_jump/J-31.png',
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
    TIME_RESET_HURT = 1; // in seconds
    world;
    speed = 6;
    offset = {
        top: 120,
        left: 40,
        right: 40,
        bottom: 20
    };
    lastMoveTime = new Date().getTime();
    hasFallingAnimationStarted = false;
    isJumping = false;
        
    constructor() {
        super().loadImage(this.CHARACTER_WALKING_IMAGES[0]);
        this.height = 250;
        this.x = 100;
        this.y = 430 - this.height; // ground level for character
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


    getLastMoveTime() {
        this.lastMoveTime = new Date().getTime();
    }
    
    
    animate(imagePathsArr, speedAnimation) {
        let interval_moveCharacter = setInterval(() => this.moveCharacter(), 1000/60);        
        let interval_playCharacter = setInterval(() => this.playCharacter(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_moveCharacter, interval_playCharacter);
    }

    sleepCharacter() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastMoveTime > 15000) { // 15 seconds of inactivity
            this.playMultiLoopAnimation(this.CHARACTER_IDLE_LONG_IMAGES);
        }
        else {
            this.playMultiLoopAnimation(this.CHARACTER_IDLE_SHORT_IMAGES);
        }
    }
    
    moveCharacter() {
        if (this.dead) {
            return; // stop moving if character is dead
        }
        if (this.canMoveRight()) {
            this.moveRight();
            this.getLastMoveTime();
            // this.walking_sound.play();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.getLastMoveTime();
            // this.walking_sound.play();
        }
        if (this.canJump()) {
            this.currentImageIndex = 0; // reset the animation to the first frame of jumping up animation
            this.canFallDownState = true;
            this.playJumpSound();
            this.jump();
            this.isJumping = true;
            this.getLastMoveTime();
        }
        
        if (this.canFallDown()) {
            if (!this.hasFallingAnimationStarted) {
                this.currentImageIndex = 0; // einmaliges Reset vor dem Fallen
                this.isJumping = false;
                this.hasFallingAnimationStarted = true;
            }
        }
        else {
            this.hasFallingAnimationStarted = false; // reset für den nächsten Sprung
        }
        this.world.camera_x = -this.x + 100;
    }
    
    playCharacter(imagePathsArr) {
        if (this.isJumping && this.speedY > 0   ) {
            this.playSingleLoopAnimation(this.CHARACTER_JUMPING_PART_1_IMAGES);
        }
        else if (this.isJumpingDown()) {
            this.playSingleLoopAnimation(this.CHARACTER_JUMPING_PART_2_IMAGES);
        }
        else if (this.isMoving()) {
            this.playMultiLoopAnimation(imagePathsArr);
        }
        else if (this.dead) {
            this.playSingleLoopAnimation(this.CHARACTER_DEAD_IMAGES);
        }
        else if (this.isHit()) {
            this.playMultiLoopAnimation(this.CHARACTER_HURT_IMAGES);
            this.playCharacterIsHitSound();
        }
        else {
            this.sleepCharacter();
        }
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    };

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.level_start_x;
    };


    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }


    canFallDown() {
        return this.isAboveGround() && (this.speedY <= 0);
    }


    // isJumpingUp() {
    //     return this.isAboveGround() && !this.dead && this.speedY > 0;
    // }


    isJumpingDown() {
        return this.isAboveGround() && !this.dead && this.speedY < 0;
    }


    isMoving() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.dead && !this.isAboveGround() && !this.isHurt();
    }


    playCharacterIsHitSound() {
        if (!this.isCharacterHitSoundPlaying) {
            this.isCharacterHitSoundPlaying = true;
            this.world.sounds.CHARACTER_HIT_SOUND.volume = 0.5;
            this.world.sounds.CHARACTER_HIT_SOUND.muted = window.isMuted || false;
            this.world.sounds.CHARACTER_HIT_SOUND.play();
            this.world.sounds.CHARACTER_HIT_SOUND.onended = () => this.isCharacterHitSoundPlaying = false;
        }
    }
}