class Character extends MoveableObject {
    width = 140;
    CHARACTER_WALKING_IMAGES = [
            './img/2_character_pepe/2_walk/W-21.png',
            './img/2_character_pepe/2_walk/W-22.png',
            './img/2_character_pepe/2_walk/W-23.png',
            './img/2_character_pepe/2_walk/W-24.png',
            './img/2_character_pepe/2_walk/W-25.png',
            './img/2_character_pepe/2_walk/W-26.png'
        ];
    CHARACTER_JUMPING_IMAGES = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
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
   
        
    constructor() {
        super().loadImage(this.CHARACTER_WALKING_IMAGES[0]);
        this.height = 250;
        this.x = 30;
        this.y = 430 - this.height; // ground level for character
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.CHARACTER_JUMPING_IMAGES);
        this.loadImages(this.CHARACTER_HURT_IMAGES);
        this.loadImages(this.CHARACTER_DEAD_IMAGES);
        this.animate(this.CHARACTER_WALKING_IMAGES, 10);
        this.applyGravity();
        
    }
    
    
    animate(imagePathsArr, speedAnimation) {
        let interval_moveCharacter = setInterval(() => this.moveCharacter(), 1000/60);        
        let interval_playCharacter = setInterval(() => this.playCharacter(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_moveCharacter, interval_playCharacter);
    }
    
    moveCharacter() {
        if (this.dead) {
            return; // stop moving if character is dead
        }
        if (this.canMoveRight()) {
            this.moveRight();
            // this.walking_sound.play();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
            // this.walking_sound.play();
        }
        if (this.canJump()) {
            this.playJumpSound();
            this.jump();
        }
        this.world.camera_x = -this.x;
    }

    playCharacter(imagePathsArr) {
        if (this.isJumping()) {
            this.playAnimation(this.CHARACTER_JUMPING_IMAGES);
        }
        else if (this.isMoving()) {
            this.playAnimation(imagePathsArr);
        }
        else if (this.dead) {
            this.playDeadAnimation(this.CHARACTER_DEAD_IMAGES);
        }
        else if (this.isHit()) {
            this.playAnimation(this.CHARACTER_HURT_IMAGES);
            this.playCharacterIsHitSound();
        }
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    };

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    };

    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }

    isJumping() {
        return this.isAboveGround() && !this.dead;
    }

    isMoving() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.dead;
    }


    playCharacterIsHitSound() {
        if (!this.isCharacterHitSoundPlaying) {
            this.isCharacterHitSoundPlaying = true;
            let character_is_hit_sound = new Audio(this.CHARACTER_HIT_SOUND);
            this.world.sounds.CHARACTER_HIT_SOUND.volume = 0.5;
            this.world.sounds.CHARACTER_HIT_SOUND.muted = window.isMuted || false;
            this.world.sounds.CHARACTER_HIT_SOUND.play();
            this.world.sounds.CHARACTER_HIT_SOUND.onended = () => this.isCharacterHitSoundPlaying = false;
        }
    }
}