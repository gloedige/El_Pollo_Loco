class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    ENDBOSS_WALKING_IMAGES = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    ENDBOSS_ALERT_IMAGES = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    ENDBOSS_ATTACK_IMAGES = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    ENDBOSS_HURT_IMAGES = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    ENDBOSS_DEAD_IMAGES = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    TIME_RESET_HURT = 1;
    world;

     offset = {
        top: 60,
        left: 30,
        right: 30,
        bottom: 50
    };

    constructor() {
        super().loadImage(this.ENDBOSS_ALERT_IMAGES[0]);
        this.x = 3300;
        this.y = 450 - this.height;
        this.loadImages(this.ENDBOSS_ALERT_IMAGES);
        this.loadImages(this.ENDBOSS_WALKING_IMAGES);
        this.loadImages(this.ENDBOSS_ATTACK_IMAGES);
        this.loadImages(this.ENDBOSS_HURT_IMAGES);
        this.loadImages(this.ENDBOSS_DEAD_IMAGES);
        this.animate(this.ENDBOSS_ALERT_IMAGES, 5);
        this.energy = 50;
    }

    animate(imagePathsArr, speedAnimation) {
        let interval_playEndboss = setInterval(() => this.playEndboss(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_playEndboss);
    }

    playEndboss(imagePathsArr) {
        if (this.dead) {
            this.playDeadAnimation(this.ENDBOSS_DEAD_IMAGES);
        } else if (this.isHit()) {
            this.playAnimation(this.ENDBOSS_HURT_IMAGES);
            this.playEnemyIsHitSound();
        } else if (this.isColliding(this.world.character)) {
            this.playAnimation(this.ENDBOSS_ATTACK_IMAGES);
        } else if (this.hasReachedEndboss() && !(this.world.character && this.world.character.dead)) {
            this.playAnimation(this.ENDBOSS_WALKING_IMAGES);
            this.autoMoveLeft(this.x, this.width);
            this.playEndbossIsWalkingSound();
        } else {
            this.playAnimation(imagePathsArr);
        }
    }
}