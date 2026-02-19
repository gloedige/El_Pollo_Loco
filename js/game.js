let canvas;
let world;
let keyboard = new Keyboard();
window.activeIntervals = [];


function init() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    document.getElementById('intro_container').classList.add('d-none');
    document.getElementById('you_win_container').classList.add('d-none');
    document.getElementById('game_over_container').classList.add('d-none');
    // document.getElementById('canvas').style.display = 'none';

    world = new World(canvas, keyboard);
}

function restartGame() {
    // Reset game state
    world = null;
    window.activeIntervals.forEach(clearInterval);
    window.activeIntervals = [];
    initLevel();
    init();
}

function showYouWinScreen() {
    document.getElementById('you_win_container').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
}

function showGameOverScreen() {
    document.getElementById('game_over_container').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
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