class Character extends MoveableObject {
    height = 250; 
    width = 140;
    CHARACTER_WALKING_IMAGES = [
            '../img/2_character_pepe/2_walk/W-21.png',
            '../img/2_character_pepe/2_walk/W-22.png',
            '../img/2_character_pepe/2_walk/W-23.png',
            '../img/2_character_pepe/2_walk/W-24.png',
            '../img/2_character_pepe/2_walk/W-25.png',
            '../img/2_character_pepe/2_walk/W-26.png'
        ];
    CHARACTER_JUMPING_IMAGES = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];
    CHARACTER_HURT_IMAGES = [
         '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png',
    ];
    CHARACTER_DEAD_IMAGES = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
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
        this.x = 30;
        this.y = 480 - 280;
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.CHARACTER_JUMPING_IMAGES);
        this.loadImages(this.CHARACTER_HURT_IMAGES);
        this.loadImages(this.CHARACTER_DEAD_IMAGES);
        this.animate(this.CHARACTER_WALKING_IMAGES, 10);
        this.applyGravity();
        // this.jump();
     }


    animate(imagePathsArr, speedAnimation) {
        setInterval(() => {
            this.moveCharacter();
        }, 1000/60);
        
        setInterval(() => {
            this.playCharacter(imagePathsArr);
        }, 1000/speedAnimation);
    }

    moveCharacter() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                // this.walking_sound.play();
            }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            // this.walking_sound.play();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x;
    }

    playCharacter(imagePathsArr) {
        if (this.isAboveGround() && !this.dead) {
            this.playAnimation(this.CHARACTER_JUMPING_IMAGES);
        }
        else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.dead) {
            this.playAnimation(imagePathsArr);
        }
        else if (this.dead) {
            this.playDeadAnimation(this.CHARACTER_DEAD_IMAGES);
        }
        else if (this.isHurt() && !this.dead) {
            this.playAnimation(this.CHARACTER_HURT_IMAGES);

        }
    }
    
}