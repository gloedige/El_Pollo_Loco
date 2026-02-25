let level1;
const numberOfCoins = 40;
const numberOfCoinsHarmonic = numberOfCoins / 2;
const numberOfCoinsBlock = numberOfCoins / 2;
const numberOfChickens = 0;
const numberOfSmallChickens = 1;
const numberOfBottles = 10;
const coins = [];
// initLevel();

function initLevel() {
    level1 = new Level(
        [
            ...createArrayOfObjects(numberOfSmallChickens, ChickenSmall),
            ...createArrayOfObjects(numberOfChickens, Chicken),
            new Endboss()
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719)
        ],
        [
            new Cloud()
        ],
        coins,
        createArrayOfObjects(numberOfBottles, Bottle)
    );
    createHarmonicCoins(numberOfCoinsHarmonic),
    createRandomCoinBlocks2x2(numberOfCoinsBlock)
}

function createArrayOfObjects(numberOfElements, object) {
    return Array.from({ length: numberOfElements }, () => new object());
}

/**
 * Erzeugt ein Array von Coins, die harmonisch (z.B. sinusförmig) im Bereich x=300..1500 und y=150..400 angeordnet sind.
 * Die Coins werden wie in Sonic the Hedgehog platziert.
 * @param {number} count - Anzahl der Coins
 * @returns {Coin[]} Array von Coin-Objekten mit passenden x/y-Koordinaten
 */
function createHarmonicCoins(count) {
    const frequency = 2;
    const xStart = 300;
    const xEnd = 1500;
    const yBase = 225; // Mittelwert zwischen 150 und 400
    const yAmplitude = 100; // Amplitude für harmonische Kurve
    for (let i = 0; i < count; i++) {
        // Gleichmäßige Verteilung auf der x-Achse
        const x = xStart + ((xEnd - xStart) / (count - 1)) * i;
        // Sinusförmige Anordnung auf der y-Achse, Frequenz steuerbar
        const y = yBase + yAmplitude * Math.sin((i / (count - 1)) * Math.PI * 2 * frequency);
        coins.push(new Coin(x, y));
    }
}


/**
 * Erzeugt eine gewünschte Anzahl von 2x2 Coin-Blöcken, die zufällig im Bereich xStart bis xEnd verteilt werden.
 * Die Anzahl der Blöcke wird aus der Gesamtanzahl der Coins berechnet (immer 4 Coins pro Block).
 * @param {number} totalCoins - Gesamtanzahl der zu platzierenden Coins (muss durch 4 teilbar sein, sonst werden weniger Coins erzeugt)
 * @param {number} [xStart=1700] - Start-x-Position
 * @param {number} [xEnd=3000] - End-x-Position
 * @param {number} [yStart=150] - Start-y-Position
 * @param {number} [yEnd=400] - End-y-Position
 * @returns {Coin[]} Array von Coin-Objekten als zufällig verteilte 2x2 Blöcke
 */
function createRandomCoinBlocks2x2(totalCoins, xStart = 1700, xEnd = 3000, yStart = 120, yEnd = 360) {
    const blockWidthPx = 40; // Abstand zwischen Coins im Block (x)
    const blockHeightPx = 40; // Abstand zwischen Coins im Block (y)
    const minBlockDistance = 100; // Mindestabstand zwischen Blöcken
    const blockCount = Math.floor(totalCoins / 4);
    const placedBlocks = [];
    for (let b = 0; b < blockCount; b++) {
        let blockX, blockY, tries = 0;
        let validPosition = false;
        // Suche eine Position mit genügend Abstand zu anderen Blöcken
        while (!validPosition && tries < 100) {
            blockX = xStart + Math.random() * (xEnd - xStart - blockWidthPx);
            blockY = yStart + Math.random() * (yEnd - yStart - blockHeightPx);
            validPosition = true;
            for (const block of placedBlocks) {
                const dx = blockX - block.x;
                const dy = blockY - block.y;
                // Prüfe Abstand (Mindestabstand gilt für Blockmitte zu Blockmitte)
                if (Math.abs(dx) < blockWidthPx + minBlockDistance && Math.abs(dy) < blockHeightPx + minBlockDistance) {
                    validPosition = false;
                    break;
                }
            }
            tries++;
        }
        placedBlocks.push({ x: blockX, y: blockY });
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const x = blockX + i * blockWidthPx;
                const y = blockY + j * blockHeightPx;
                coins.push(new Coin(x, y));
            }
        }
    }
}