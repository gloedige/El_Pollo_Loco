class Chicken extends MoveableObject{
    height = 50;
    
    constructor(x, y, img){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 470; // random x position between 200 and 670 (720 - 50 width of chicken)
        this.y = 480 - this.height; // ground level for chicken
    }

   



}