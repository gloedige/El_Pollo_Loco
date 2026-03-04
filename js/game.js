let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let stateOfFullscreen = false;
window.sounds = sounds;
window.activeIntervals = [];
window.isMuted = false;

let you_won_sound = sounds.YOU_WON_SOUND;
let game_over_sound = sounds.GAME_OVER_SOUND;
let game_music_loop = sounds.GAME_MUSIC_LOOP;

you_won_sound.muted = window.isMuted === true;
game_over_sound.muted = window.isMuted === true;
game_music_loop.muted = window.isMuted === true;

you_won_sound.volume = 0.4;
game_over_sound.volume = 0.8;
game_music_loop.volume = 0.1;


/**
 * Initializes the game, sets up canvas and containers, starts music, and sets mute state.
 */
function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('canvas_container').classList.remove('d-none');
    document.getElementById('intro_container').classList.add('d-none');
    document.getElementById('you_win_container').classList.add('d-none');
    document.getElementById('game_over_container').classList.add('d-none');
    document.getElementById('muteButton_canvas').classList.remove('d-none');
    document.getElementById('muteButton_you_win').classList.add('d-none');
    document.getElementById('muteButton_game_over').classList.add('d-none');
    game_music_loop.play();
    game_music_loop.loop = true;
    
    world = new World(canvas, keyboard, sounds);
    setLastMutedStateOnButton();
}


/**
 * Ends the game, clears intervals, stops music, and resets world.
 */
function endGame() {
    if (world) {
        world.stop();
        window.activeIntervals.forEach(clearInterval);
        window.activeIntervals = [];
        stopMusicAndSoundsLoops();
        world = null;
    }
}


/**
 * Restarts the game, clears state, reinitializes level and game.
 */
function restartGame() {
    endGame();
    world = null;
    window.activeIntervals.forEach(clearInterval);
    window.activeIntervals = [];
    initLevel();
    init();
}


/**
 * Closes the game, ends game, updates containers, and resets mute button state.
 */
function closeGame() {
    endGame();
    document.getElementById('canvas_container').classList.add('d-none');
    document.getElementById('intro_container').classList.remove('d-none');
    document.getElementById('you_win_container').classList.add('d-none');
    document.getElementById('game_over_container').classList.add('d-none');
    document.getElementById('muteButton_canvas').classList.add('d-none');
    document.getElementById('muteButton_you_win').classList.add('d-none');
    document.getElementById('muteButton_game_over').classList.add('d-none');
    setLastMutedStateOnButton();
}


/**
 * Simulates moving right by setting the RIGHT key state to true while the button is pressed
 * and to false when the button is released.
 */
function moveRight() {
    keyboard.RIGHT = true;
}


/**
 * Simulates moving left by setting the LEFT key state to true while the button is pressed
 * and to false when the button is released.
 */
function moveLeft() {
    keyboard.LEFT = true;
}


/**
 * Simulates jumping by setting the UP key state to true while the button is pressed
 * and to false when the button is released.
 */
function jump() {
    keyboard.UP = true;
}


/**
 * Simulates throwing a bottle by setting the SPACE key state to true while the button is pressed
 * and to false when the button is released.
 */
function throwBottle() {
    keyboard.SPACE = true;
}


/**
 * Stops game music loop and other sound loops.
 */
function stopMusicAndSoundsLoops() {
    world.sounds.stop(world.sounds.GAME_MUSIC_LOOP);
    world.sounds.stop(world.sounds.WALKING_ENDBOSS_SOUND);
}


/**
 * Shows the win screen, updates containers, plays win sound.
 */
function showYouWinScreen() {
    document.getElementById('you_win_container').classList.remove('d-none');
    document.getElementById('canvas_container').classList.add('d-none');
    document.querySelector('.you_win_img').classList.add('scale-in');
    document.getElementById('muteButton_canvas').classList.add('d-none');
    document.getElementById('muteButton_you_win').classList.remove('d-none');
    game_music_loop.pause();
    you_won_sound.play();
}


/**
 * Shows game over screen, updates containers, plays game over sound.
 */
function showGameOverScreen() {
    document.getElementById('game_over_container').classList.remove('d-none');
    document.getElementById('canvas_container').classList.add('d-none');
    document.querySelector('.game_over_img').classList.add('scale-in');
    document.getElementById('muteButton_canvas').classList.add('d-none');
    document.getElementById('muteButton_game_over').classList.remove('d-none');
    game_music_loop.pause();
    game_over_sound.play();
}


/**
 * Toggles mute state for all sounds and updates mute button and local storage.
 */
function toggleMute() {
    window.isMuted = !window.isMuted;
    you_won_sound.muted = window.isMuted;
    game_over_sound.muted = window.isMuted;
    game_music_loop.muted = window.isMuted;
    window.sounds.soundEffectsArray.forEach(sound => sound.muted = window.isMuted);
    document.getElementById('muteButton_canvas').style.backgroundImage = window.isMuted ? "url('./img/10_button/muted_icon.svg')" : "url('./img/10_button/unmuted_icon.svg')";
    document.getElementById('muteButton_you_win').style.backgroundImage = window.isMuted ? "url('./img/10_button/muted_icon.svg')" : "url('./img/10_button/unmuted_icon.svg')";
    document.getElementById('muteButton_game_over').style.backgroundImage = window.isMuted ? "url('./img/10_button/muted_icon.svg')" : "url('./img/10_button/unmuted_icon.svg')";
    saveMuteStateInLocalStorage();
}


/**
 * Retrieves mute state from local storage and updates global variable.
 */
function getMuteStateFromLocalStorage(){
    let storedMuteState = localStorage.getItem('isMuted');
    if (storedMuteState !== null){
        window.isMuted = JSON.parse(storedMuteState);
    }
}


/**
 * Saves current mute state in local storage.
 */
function saveMuteStateInLocalStorage(){
    localStorage.setItem("isMuted", JSON.stringify(window.isMuted));
}


/**
 * Sets last mute state on mute button and updates all sounds.
 */
function setLastMutedStateOnButton() {
    getMuteStateFromLocalStorage();
    const muteButton_canvas = document.getElementById('muteButton_canvas');
    const muteButton_you_win = document.getElementById('muteButton_you_win');
    const muteButton_game_over = document.getElementById('muteButton_game_over');
    if (window.isMuted) {
        muteButton_canvas.style.backgroundImage = "url('./img/10_button/muted_icon.svg')";
        muteButton_you_win.style.backgroundImage = "url('./img/10_button/muted_icon.svg')";
        muteButton_game_over.style.backgroundImage = "url('./img/10_button/muted_icon.svg')";
    } else {
        muteButton_canvas.style.backgroundImage = "url('./img/10_button/unmuted_icon.svg')";
        muteButton_you_win.style.backgroundImage = "url('./img/10_button/unmuted_icon.svg')";
        muteButton_game_over.style.backgroundImage = "url('./img/10_button/unmuted_icon.svg')";
    }
    setMuteStateToSounds();
}


/**
 * Sets mute state for all sounds based on window.isMuted.
 */
function setMuteStateToSounds() {
    you_won_sound.muted = window.isMuted;
    game_over_sound.muted = window.isMuted;
    game_music_loop.muted = window.isMuted;
    window.sounds.soundEffectsArray.forEach(sound => sound.muted = window.isMuted);
}


/**
 * Adds event listeners for keyboard keydown and keyup events to update keyboard state for movement and actions.
 */
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keyboard.LEFT = true;
    if (e.key === "ArrowRight") keyboard.RIGHT = true;
    if (e.key === "ArrowUp") keyboard.UP = true;
    if (e.key === "ArrowDown") keyboard.DOWN = true;
    if (e.key === " ") keyboard.SPACE = true;
    if (e.key === "d") keyboard.D = true;
});


/**
 * Adds event listeners for keyboard keyup events to update keyboard state when keys are released.
 */
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keyboard.LEFT = false;
    if (e.key === "ArrowRight") keyboard.RIGHT = false;
    if (e.key === "ArrowUp") keyboard.UP = false;
    if (e.key === "ArrowDown") keyboard.DOWN = false;
    if (e.key === " ") keyboard.SPACE = false;
    if (e.key === "d") keyboard.D = false;
});