class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    bottles;
    level_start_x = 100;
    level_end_x = 720 * 2 * 2 + 720;

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
    }
}