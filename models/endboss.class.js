class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    ENDBOSS_WALKING_IMAGES = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    ENDBOSS_ALERT_IMAGES = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    ENDBOSS_ATTACK_IMAGES = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    ENDBOSS_HURT_IMAGES = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    ENDBOSS_DEAD_IMAGES = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    TIME_RESET_HURT = 1;
    GROUND_LEVEL_ENDBOSS = 30;
    ENDBOSS_START_X_POSITION = 3500;
    ENDBOSS_LEFT_EDGE = this.ENDBOSS_START_X_POSITION - 500; // 500 Pixel vor dem Charakter
    ENDBOSS_RIGHT_EDGE = this.ENDBOSS_START_X_POSITION + 220 - this.width; // 220 Pixel hinter dem Charakter
    
    world;
    direction = 'left';
    offset = {
        top: 60,
        left: 30,
        right: 30,
        bottom: 50
    };

    constructor() {
        super().loadImage(this.ENDBOSS_ALERT_IMAGES[0]);
        this.x = this.ENDBOSS_START_X_POSITION;
        this.y = this.HEIGHT_CANVAS - this.GROUND_LEVEL_ENDBOSS - this.height;
        this.loadImages(this.ENDBOSS_ALERT_IMAGES);
        this.loadImages(this.ENDBOSS_WALKING_IMAGES);
        this.loadImages(this.ENDBOSS_ATTACK_IMAGES);
        this.loadImages(this.ENDBOSS_HURT_IMAGES);
        this.loadImages(this.ENDBOSS_DEAD_IMAGES);
        this.animate(this.ENDBOSS_ALERT_IMAGES, 5);
        this.energy = 50;
        this.otherDirection = false;
    }

    animate(imagePathsArr, speedAnimation) {
        let interval_playEndboss = setInterval(() => this.playEndboss(imagePathsArr), 1000/speedAnimation);
        window.activeIntervals.push(interval_playEndboss);
    }

    playEndboss(imagePathsArr) {
        if (this.dead) {
            this.playSingleLoopAnimation(this.ENDBOSS_DEAD_IMAGES);
        } else if (this.isHit()) {
            this.playMultiLoopAnimation(this.ENDBOSS_HURT_IMAGES);
            this.playEnemyIsHitSound();
        } else if (this.isColliding(this.world.character)) {
            this.playMultiLoopAnimation(this.ENDBOSS_ATTACK_IMAGES);
        } else if (this.characterReachesEndboss && !(this.world.character && this.world.character.dead)) {
            // this.autoMoveLeft(this.x, this.width);
            this.autoMoveAttack();
            this.playMultiLoopAnimation(this.ENDBOSS_WALKING_IMAGES);
            this.playEndbossIsWalkingSound();
        } else if (!this.characterReachesEndboss){
            this.hasReachedEndboss();
            this.playMultiLoopAnimation(imagePathsArr);
        }
    }

    playEndbossIsWalkingSound() {
        if (!this.isEndbossWalkingSoundPlaying && this.world && this.world.sounds) {
            this.isEndbossWalkingSoundPlaying = true;
            this.world.sounds.WALKING_ENDBOSS_SOUND.volume = 0.5;
            this.world.sounds.WALKING_ENDBOSS_SOUND.muted = window.isMuted || false;
            this.world.sounds.WALKING_ENDBOSS_SOUND.play();
            this.world.sounds.WALKING_ENDBOSS_SOUND.loop = true;
        }
    }


    stopEndbossWalkingSound() {
        if (this.world && this.world.sounds) {
            this.world.sounds.WALKING_ENDBOSS_SOUND.loop = false;
            this.world.sounds.WALKING_ENDBOSS_SOUND.pause();
            this.world.sounds.WALKING_ENDBOSS_SOUND.currentTime = 0;
        }
    }

    // this funtion move the endboss automatically to the left when character reaches and turns to the right when reaching end of canvas
    // autoMoveAttack() {
    //     // Endboss bewegt sich abwechselnd nach links und rechts innerhalb des sichtbaren Bereichs
    //     let direction = 'left';
    //     let interval_autoMoveAttack = setInterval(() => {
    //         switch (direction) {
    //             case 'left':
    //                 this.moveLeft();
    //                 if (this.x <= this.ENDBOSS_LEFT_EDGE) {
    //                     this.x = this.ENDBOSS_LEFT_EDGE;
    //                     direction = 'right';
    //                 }
    //                 break;
    //             case 'right':
    //                 this.moveRight();
    //                 if (this.x >= this.ENDBOSS_RIGHT_EDGE) {
    //                     this.x = this.ENDBOSS_RIGHT_EDGE;
    //                     direction = 'left';
    //                 }
    //                 break;
    //         }
    //     }, 1000 / 30);
    //     window.activeIntervals.push(interval_autoMoveAttack);
    // }


    autoMoveAttack() {
        if (this.direction === 'left') {
            this.x -= this.speed;
            if (!this.otherDirection) this.otherDirection = false;
            if (this.x <= this.ENDBOSS_LEFT_EDGE) {
                this.x = this.ENDBOSS_LEFT_EDGE;
                this.direction = 'right';
            }
        } else {
            this.x += this.speed;
            if (this.otherDirection) this.otherDirection = true;
            if (this.x >= this.ENDBOSS_RIGHT_EDGE) {
                this.x = this.ENDBOSS_RIGHT_EDGE;
                this.direction = 'left';
            }
        }
    }


    


    /**
     * Zeichnet die Begrenzungslinien für den Endboss-Bereich
     * @param {CanvasRenderingContext2D} ctx - Canvas Kontext
     */
    drawLines(ctx) {
        // Linke Begrenzung
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.ENDBOSS_LEFT_EDGE, 0);
        ctx.lineTo(this.ENDBOSS_LEFT_EDGE, this.HEIGHT_CANVAS);
        ctx.stroke();

        // Rechte Begrenzung
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.ENDBOSS_RIGHT_EDGE + this.width, 0);
        ctx.lineTo(this.ENDBOSS_RIGHT_EDGE + this.width, this.HEIGHT_CANVAS);
        ctx.stroke();
    }

}