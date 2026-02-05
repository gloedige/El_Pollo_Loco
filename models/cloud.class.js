class Cloud extends MoveableObject{
    y = 20;
    height = 250;
    width = 500;

    start_position_x = 0;
    end_position_x = -this.width;
    difference_of_position = 0;

    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500; // random x position between 0 and 500
        this.moveCloud(this.x);
    }

    moveCloud(start_position_x){
        setInterval(() => {
            this.x = start_position_x - this.difference_of_position;
            this.difference_of_position += 0.5;
            if(this.x <= this.end_position_x){
                this.difference_of_position = 0;
                start_position_x = 720;

            }
    }
    , 1000 / 60); // 60 times per second
    }

}