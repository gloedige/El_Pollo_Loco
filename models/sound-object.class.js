/**
 * Represents the game's sound system.
 */
class Sounds {
    isJumpingSoundPlaying = false;
    isEnemyHitSoundPlaying = false;
    world;


    /**
     * Initializes the sound system with audio files and categorizes them into music and sound effects.
     */
    constructor() {
        this.WALKING_ENDBOSS_SOUND = new Audio('./audio/walking_endboss_sound.mp3');
        this.JUMP_SOUND = new Audio('./audio/cartoon_jump_sound_short.mp3');
        this.ENEMY_HIT_SOUND = new Audio('./audio/chicken_is_dead_sound.mp3');
        this.CHARACTER_HIT_SOUND = new Audio('./audio/character_hurt_sound.mp3');
        this.CHARACTER_SLEEPING_SOUND = new Audio('./audio/snoring_man_sound.mp3');
        this.YOU_WON_SOUND = new Audio('./audio/you_won_sound.mp3');
        this.GAME_OVER_SOUND = new Audio('./audio/game_over_sound.mp3');
        this.GAME_MUSIC_LOOP = new Audio('./audio/game_music_loop.mp3');
        this.GET_COIN_SOUND = new Audio('./audio/get_a_coin_short.mp3');
        this.GET_BOTTLE_SOUND = new Audio('./audio/pick_a_bottle_sound.mp3');
        
        this.musicArray = [
            this.GAME_MUSIC_LOOP,
            this.YOU_WON_SOUND,
            this.GAME_OVER_SOUND
        ];

        this.soundEffectsArray = [
            this.WALKING_ENDBOSS_SOUND,
            this.JUMP_SOUND,
            this.ENEMY_HIT_SOUND,
            this.CHARACTER_HIT_SOUND,
            this.CHARACTER_SLEEPING_SOUND,
            this.GET_COIN_SOUND,
            this.GET_BOTTLE_SOUND
        ];
    }


    /**
     * Stops the given sound.
     * @param {HTMLAudioElement} sound - The sound to stop.
     */
    stop(sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.loop = false;
    }


    /**
     * Stops all music and sound effects.
     */
    playJumpSound() {
        if (!this.isJumpingSoundPlaying && this.world && this.world.sounds) {
            this.isJumpingSoundPlaying = true;
            this.world.sounds.JUMP_SOUND.volume = 0.5;
            this.world.sounds.JUMP_SOUND.muted = window.isMuted || false;
            this.world.sounds.JUMP_SOUND.play();
            this.world.sounds.JUMP_SOUND.onended = () => this.isJumpingSoundPlaying = false;
        }
    }


    /**
     * Plays the enemy hit sound if not already playing.
     */
    playEnemyIsHitSound() {
        if (!this.isEnemyHitSoundPlaying && this.world && this.world.sounds) {
            this.isEnemyHitSoundPlaying = true;
            this.world.sounds.ENEMY_HIT_SOUND.volume = 0.5;
            this.world.sounds.ENEMY_HIT_SOUND.muted = window.isMuted || false;
            this.world.sounds.ENEMY_HIT_SOUND.play();
            this.world.sounds.ENEMY_HIT_SOUND.onended = () => this.isEnemyHitSoundPlaying = false;
        }
    }
}