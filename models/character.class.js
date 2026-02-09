class Character extends MoveableObject {
    height = this.HEIGHT_CANVAS;
    width = 240;
    CHARACTER_WALKING_IMAGES = [
            '../img/2_character_pepe/2_walk/W-21.png',
            '../img/2_character_pepe/2_walk/W-22.png',
            '../img/2_character_pepe/2_walk/W-23.png',
            '../img/2_character_pepe/2_walk/W-24.png',
            '../img/2_character_pepe/2_walk/W-25.png',
            '../img/2_character_pepe/2_walk/W-26.png'
        ];
    CHAQRACTER_JUMPING_IMAGES = [
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

    currentImageIndex = 0;
    world;
    speed = 6;

    offset = {
        top: 200,
        left: 80,
        right: 50,
        bottom: 30
    };
    

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.x = 0;
        this.y = 450 - this.height; // ground level
        this.loadImages(this.CHARACTER_WALKING_IMAGES);
        this.loadImages(this.CHAQRACTER_JUMPING_IMAGES);
        this.animate(this.CHARACTER_WALKING_IMAGES, 15);
        this.jump();
        this.applyGravity();
    }


    animate(imagePathsArr, speedAnimation) {
        
        setInterval(() => {
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
        }, 1000/60);


        
        setInterval(() => {
            if (this.isAboveGround()) {
                // Jump animation
                this.playAnimation(this.CHAQRACTER_JUMPING_IMAGES);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                this.playAnimation(imagePathsArr);
            }
        }, 1000/speedAnimation);
    }
    
}