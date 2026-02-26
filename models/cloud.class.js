class Cloud extends MoveableObject{
    y = 20;
    height = 250;
    width = 500;
    

    constructor(y){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 100 + Math.random() * 3300;
        this.y = y;
        this.speed = 0.1 + Math.random() * 0.3;
        this.autoMoveLeft(this.x, this.width);
    }


    animate() {
        this.autoMoveLeft(this.x, this.width);
    }

   

}