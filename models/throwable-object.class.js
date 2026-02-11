class ThrowableObject extends MoveableObject {
    BOTTLE_ROTATION_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x,y){
        super();
        this.loadImage(this.BOTTLE_ROTATION_IMAGES[0]);
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.speedX = 30;
        this.speedY = 10;
        this.throw();
    }
    
    throw() {
        setInterval(() => {
            this.applyGravity();
            this.playAnimation(this.BOTTLE_ROTATION_IMAGES);
            this.x += this.speedX;
            this.y -= this.speedY;
        }, 50);
    
    }
}