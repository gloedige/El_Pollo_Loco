/**
 * Class representing the keyboard input state.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


constructor() {
    this.bindBtnPressEvents();
}



bindBtnPressEvents() {
    this.bindTouchButton('moveRightButton', 'RIGHT');
    this.bindTouchButton('moveLeftButton', 'LEFT');
    this.bindTouchButton('jumpButton', 'UP');
    this.bindTouchButton('throwBottleButton', 'SPACE');
}


bindTouchButton(buttonId, keyName) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('touchstart', (e)  => {
        e.preventDefault();
        this[keyName] = true;
    });

    button.addEventListener('touchend', (e)  => {
        e.preventDefault();
        this[keyName] = false;
    });

    button.addEventListener('touchcancel', (e)  => {
        e.preventDefault();
        this[keyName] = false;
    });
    }

}
