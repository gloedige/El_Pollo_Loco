class Level {
    enemies;
    backgroundObjects;
    clouds;
    level_end_x = 720 * 3;

    constructor(enemies, backgroundObjects, clouds) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
    }
}