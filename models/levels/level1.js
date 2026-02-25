let level1;
const numberOfCoins = 30;
const numberOfChickens = 0;
const numberOfSmallChickens = 1;
const numberOfBottles = 10;
// initLevel();

function initLevel() {
    level1 = new Level(
        [
            ...createArrayOfObjects(numberOfSmallChickens, ChickenSmall),
            ...createArrayOfObjects(numberOfChickens, Chicken),
            new Endboss()
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719)
        ],
        [
            new Cloud()
        ],
        createArrayOfObjects(numberOfCoins, Coin),
        createArrayOfObjects(numberOfBottles, Bottle)
    );
}

function createArrayOfObjects(numberOfElements, object) {
    return Array.from({ length: numberOfElements }, () => new object());
}