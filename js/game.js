let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
window.sounds = sounds; // Make sounds globally accessible for other classes
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

function init() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    document.getElementById('intro_container').classList.add('d-none');
    document.getElementById('you_win_container').classList.add('d-none');
    document.getElementById('game_over_container').classList.add('d-none');
    document.getElementById('muteButton').classList.remove('d-none');
    game_music_loop.play();
    game_music_loop.loop = true;
    
    world = new World(canvas, keyboard, sounds);
    setLastMutedStateOnButton();
}


function endGame() {
    window.activeIntervals.forEach(clearInterval);
    window.activeIntervals = [];
    stopLoopingGameMusic();
    world = null;
}


function restartGame() {
    world = null;
    window.activeIntervals.forEach(clearInterval);
    window.activeIntervals = [];
    initLevel();
    init();
}


function stopLoopingGameMusic() {
    world.sounds.stop(world.sounds.GAME_MUSIC_LOOP);
    world.sounds.stop(world.sounds.WALKING_ENDBOSS_SOUND);
    // window.sounds.stop(window.sounds.WALKING_ENDBOSS_SOUND);
}


function showYouWinScreen() {
    document.getElementById('you_win_container').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.querySelector('.you_win_img').classList.add('scale-in');
    document.getElementById('muteButton').classList.add('d-none');
    game_music_loop.pause();
    you_won_sound.play();
}


function showGameOverScreen() {
    document.getElementById('game_over_container').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.querySelector('.game_over_img').classList.add('scale-in');
    document.getElementById('muteButton').classList.add('d-none');
    game_music_loop.pause();
    game_over_sound.play();
}


function toggleMute() {
    window.isMuted = !window.isMuted;

    // Update the muted property of all audio elements
    you_won_sound.muted = window.isMuted;
    game_over_sound.muted = window.isMuted;
    game_music_loop.muted = window.isMuted;
    // Optionally, update button icon
    document.getElementById('muteButton').textContent = window.isMuted ? '🔇' : '🔈';
    saveMuteStateInLocalStorage();
}


window.addEventListener("keydown", (e) => {
    // console.log('Key down: ', e.key);
    if (e.key === "ArrowLeft") keyboard.LEFT = true;
    if (e.key === "ArrowRight") keyboard.RIGHT = true;
    if (e.key === "ArrowUp") keyboard.UP = true;
    if (e.key === "ArrowDown") keyboard.DOWN = true;
    if (e.key === " ") keyboard.SPACE = true;
    if (e.key === "d") keyboard.D = true;
});


window.addEventListener("keyup", (e) => {
    // console.log('Key up: ', e.key);
    if (e.key === "ArrowLeft") keyboard.LEFT = false;
    if (e.key === "ArrowRight") keyboard.RIGHT = false;
    if (e.key === "ArrowUp") keyboard.UP = false;
    if (e.key === "ArrowDown") keyboard.DOWN = false;
    if (e.key === " ") keyboard.SPACE = false;
    if (e.key === "d") keyboard.D = false;
});


function getMuteStateFromLocalStorage(){
  let storedMuteState = localStorage.getItem('isMuted');
  if (storedMuteState !== null){
    window.isMuted = JSON.parse(storedMuteState);
  }
}


function saveMuteStateInLocalStorage(){
  localStorage.setItem("isMuted", JSON.stringify(window.isMuted));
}


function setLastMutedStateOnButton() {
    getMuteStateFromLocalStorage();
    const muteButton = document.getElementById('muteButton');
    if (window.isMuted) {
        muteButton.textContent = '🔇';
    } else {
        muteButton.textContent = '🔈';
    }
    setMuteStateToSounds();
}


function setMuteStateToSounds() {
    you_won_sound.muted = window.isMuted;
    game_over_sound.muted = window.isMuted;
    game_music_loop.muted = window.isMuted;
}