let level1;
const xPositions_layer_1 = [0, 719 * 2];
const xPositions_layer_2 = [0, 719 * 2];
const xPositions_layer_3 = [0, 719 * 2];
const xPositions_layer_4 = [0, 719 * 2];
const move_speed_layer_4 = 0;
const move_speed_layer_3 = 0.5;
const move_speed_layer_2 = 1;
const move_speed_layer_1 = 2;
initLevel();

function initLevel() {
    level1 = new Level(
        [
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Endboss()
        ],
        [
            new BackgroundObject('../img/5_background/layers/air.png', xPositions_layer_4, move_speed_layer_4),
            new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', xPositions_layer_3, move_speed_layer_3),
            new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', xPositions_layer_2, move_speed_layer_2),
            new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', xPositions_layer_1, move_speed_layer_1),
        ],
        [
            new Cloud()
        ]
    );
}