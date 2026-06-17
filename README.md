# El Pollo Loco 🐔

A browser-based 2D jump-and-run game built with vanilla JavaScript and the HTML5 Canvas API. Play as Pepe, collect coins and salsa bottles, defeat chickens, and battle the final boss — El Pollo Loco!

---

## Table of Contents

1. [Demo](#demo)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [How to Play](#how-to-play)
5. [Controls](#controls)
6. [File Structure](#file-structure)
7. [Technologies](#technologies)
8. [License](#license)

---

## Demo

Open `index.html` directly in your browser — no build step needed.

---

## Requirements

- A modern web browser with HTML5 Canvas support (Chrome, Firefox, Edge, Safari)
- No additional runtime, framework, or package manager is required
- JavaScript must be enabled

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gloedige/El_Pollo_Loco.git
   ```

2. **Navigate into the project folder**
   ```bash
   cd El_Pollo_Loco
   ```

3. **Open the game**
   - Simply open `index.html` in your browser, **or**
   - Serve it with a local development server to avoid potential audio autoplay restrictions:
     ```bash
     # Using Python
     python -m http.server 8080
     # Then open http://localhost:8080 in your browser
     ```

> **Note:** Running the game from the file system (`file://`) may block audio in some browsers. Using a local server (e.g. VS Code Live Server, `http-server`, or `python -m http.server`) is recommended.

---

## How to Play

- Click **START GAME** on the title screen.
- Move Pepe to the right, collect **coins** and **salsa bottles** along the way.
- Stomp on **chickens** by jumping on them, or throw a salsa bottle to defeat them.
- Reach the end of the level and defeat **El Pollo Loco** — the endboss chicken — to win.
- Watch your **health bar**; running out of health ends the game.

---

## Controls

| Action        | Keyboard   | Mobile Button |
|---------------|------------|---------------|
| Walk Left     | ← Arrow    | ← Button      |
| Walk Right    | → Arrow    | → Button      |
| Jump          | ↑ Arrow    | Jump Button   |
| Throw Bottle  | Space      | Bottle Button |

---

## File Structure

```
El_Pollo_Loco/
├── index.html                        # Main HTML entry point
├── impressum.html                    # Legal notice / Impressum
├── style.css                         # Global styles
│
├── js/
│   └── game.js                       # Game initialisation, input handling, utility functions
│
├── models/                           # Game object classes
│   ├── drawable-object.class.js      # Base class for all drawable objects
│   ├── moveable-object.class.js      # Extends DrawableObject; adds physics & movement
│   ├── character.class.js            # Player character (Pepe)
│   ├── chicken.class.js              # Normal chicken enemy
│   ├── chicken-small.class.js        # Small chicken enemy
│   ├── endboss.class.js              # Final boss chicken
│   ├── cloud.class.js                # Scrolling cloud objects
│   ├── coins.class.js                # Collectible coins
│   ├── bottles.class.js              # Collectible salsa bottles
│   ├── throwable-object.class.js     # Thrown salsa bottle projectile
│   ├── background-object.class.js    # Parallax background layers
│   ├── status-bar.class.js           # HUD status bars (health, coins, bottles, endboss)
│   ├── keyboard.class.js             # Keyboard / touch input state
│   ├── sound-object.class.js         # Audio manager
│   ├── world.class.js                # Main game world (loop, rendering, collision)
│   └── levels/
│       └── level1.js                 # Level 1 definition (enemies, coins, bottles, clouds, backgrounds)
│
├── audio/                            # Sound effects and music (MP3)
├── font/                             # Custom fonts
└── img/                              # Sprite sheets and UI images
    ├── 1_editables/
    ├── 2_character_pepe/             # Pepe walk, jump, hurt, dead animations
    ├── 3_enemies_chicken/            # Chicken walk & dead animations
    ├── 4_enemie_boss_chicken/        # Endboss animations
    ├── 5_background/                 # Parallax background layers
    ├── 6_salsa_bottle/               # Bottle sprites
    ├── 7_statusbars/                 # Health, coin, bottle, endboss bars
    ├── 8_coin/                       # Coin sprites
    ├── 9_intro_outro_screens/        # Start screen, win/lose screens, rotate-device prompt
    ├── 10_button/                    # Arrow and action button icons
    ├── 11_favicon/                   # Browser favicon
    └── You won, you lost/            # Win / Game Over overlay images
```

---

## Technologies

- **HTML5** — Canvas API, semantic markup
- **CSS3** — Responsive layout, animations
- **Vanilla JavaScript (ES6+)** — Class-based OOP, game loop via `requestAnimationFrame`

No external libraries or build tools are required.

---

## License

This project was created as a learning exercise. All game assets are either self-created or used for educational purposes.
