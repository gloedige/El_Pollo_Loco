class Chicken extends MoveableObject{
    height = 120;
    width = 100;
    CHICKEN_WALKING_IMAGES = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top: 20,
        left: 10,
        right: 10,
        bottom: 20
    };
    
    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 470; // random x position between 200 and 670 (720 - 50 width of chicken)
        this.y = 440 - this.height; // ground level for chicken
        this.loadImages(this.CHICKEN_WALKING_IMAGES);
        this.animate(this.CHICKEN_WALKING_IMAGES, 12);
        this.speed = 0.1 + Math.random() * 0.3; // random speed between 0.1 and 0.4
        this.autoMoveLeft(this.x, this.width);
    }


    animate(imagePathsArr, speedAnimation) {
        setInterval(() => {
            this.playAnimation(imagePathsArr);
        }, 1000/speedAnimation);
    }

   



}