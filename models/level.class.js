class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    level_end_x = 720 * 2 * 3;

    constructor(enemies, backgroundObjects, clouds, coins) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
    }
}