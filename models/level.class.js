/**
 * Class representing a level in the game.
 */
class Level {
    enemies;
    backgroundObjects;
    clouds;
    coins;
    bottles;
    level_start_x = 100;
    level_end_x = 720 * 2 * 2 + 720;


    /**
     * Creates a new Level instance and initializes its properties.
     * @param {Array<Object>} enemies - Array of enemy objects in the level.
     * @param {Array<Object>} clouds - Array of cloud objects in the level.
     * @param {Array<Object>} backgroundObjects - Array of background object instances in the level.
     * @param {Array<Object>} coins - Array of coin objects in the level.
     * @param {Array<Object>} bottles - Array of bottle objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
    }
}