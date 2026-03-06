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


/**
 * Initializes a new Keyboard instance and binds the button press events.
 */
constructor() {
    this.bindBtnPressEvents();
}


/**
 * Binds touch events to the specified buttons for controlling the character's movement and actions.
 */
bindBtnPressEvents() {
    this.bindTouchButton('moveRightButton', 'RIGHT');
    this.bindTouchButton('moveLeftButton', 'LEFT');
    this.bindTouchButton('jumpButton', 'UP');
    this.bindTouchButton('throwBottleButton', 'SPACE');
}


/**
 * Binds touch events to a specific button for controlling the character's movement or actions.
 * @param {string} buttonId - The ID of the button element.
 * @param {string} keyName - The name of the key to bind the touch events to.
 */
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
