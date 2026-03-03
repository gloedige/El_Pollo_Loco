let level1;
const numberOfCoins = 40;
const numberOfCoinsHarmonic = numberOfCoins / 2;
const numberOfCoinsBlock = numberOfCoins / 2;
const numberOfChickens = 5;
const numberOfSmallChickens = 5;
const numberOfBottles = 10;
const coins = [];
let validPosition = false;


/**
 * Retrieves the last mute state from local storage and sets it to window.isMuted.
 * This function should be called at the start of the game to ensure that the mute 
 * state is consistent with the user's last choice.
 */
function initLevel() {
    coins.length = 0;
    level1 = new Level(
        [
            new Endboss(),
            ...createArrayOfObjects(numberOfSmallChickens, ChickenSmall),
            ...createArrayOfObjects(numberOfChickens, Chicken)
        ],
        [
            new Cloud(20),
            new Cloud(50),
            new Cloud(80),
            new Cloud(110),
            new Cloud(20),
            new Cloud(50),
            new Cloud(80),
            new Cloud(110)
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
        coins,
        createArrayOfObjects(numberOfBottles, Bottle)
    );
    createHarmonicCoins(numberOfCoinsHarmonic),
    createRandomCoinBlocks2x2(numberOfCoinsBlock)
}


/**
 * 
 * @param {number} numberOfElements 
 * @param {new (...args: any[]) => any} object - Constructor function of the object type
 * @returns {any[]} Array of created objects
 */
function createArrayOfObjects(numberOfElements, object) {
    return Array.from({ length: numberOfElements }, () => new object());
}


/**
 * This function creates a specified number of coins arranged in a harmonic pattern along the x-axis, 
 * with their y-coordinates determined by a sine wave to create a visually appealing distribution.
 * @param {number} count - Number of coins
 * @returns {Array<Coin>} Array of Coin objects with appropriate x/y coordinates
 */
function createHarmonicCoins(count) {
    const frequency = 2;
    const xStart = 300;
    const xEnd = 1500;
    const yBase = 225;
    const yAmplitude = 100;
    for (let i = 0; i < count; i++) {
        const x = xStart + ((xEnd - xStart) / (count - 1)) * i;
        const y = yBase + yAmplitude * Math.sin((i / (count - 1)) * Math.PI * 2 * frequency);
        coins.push(new Coin(x, y));
    }
}


/**
 * This function creates a specified number of 2x2 coin blocks randomly distributed within the given x and y ranges.
 * The number of blocks is calculated from the total number of coins (always 4 coins per block).
 * @param {number} totalCoins - Total number of coins to place (must be divisible by 4, otherwise fewer coins will be created)
 * @param {number} [xStart=1700] - Start x position
 * @param {number} [xEnd=3000] - End x position
 * @param {number} [yStart=150] - Start y position
 * @param {number} [yEnd=400] - End y position
 * @returns {Array} Array of Coin objects as randomly distributed 2x2 blocks
 */
function createRandomCoinBlocks2x2(totalCoins, xStart = 1700, xEnd = 3000, yStart = 120, yEnd = 360) {
    const blockWidthPx = 40;
    const blockHeightPx = 40;
    const minBlockDistance = 100;
    const blockCount = Math.floor(totalCoins / 4);
    const placedBlocks = [];
    for (let b = 0; b < blockCount; b++) {
        let blockX, blockY = 0;
        validPosition = false;
        ({ blockX, blockY } = createBlockPosition(placedBlocks, blockWidthPx, blockHeightPx, minBlockDistance, xStart, xEnd, yStart, yEnd));
        placedBlocks.push({ x: blockX, y: blockY });
        createCoinBlock(blockX, blockY, blockWidthPx, blockHeightPx);
    }
}


/**
 * This function generates random x and y coordinates for a coin block while ensuring that the block does not overlap with existing 
 * blocks within a specified minimum distance. It attempts to find a valid position up to 100 times before giving up.
 * 
 * @param {Array} existingBlocks - Array of existing block positions to check against for minimum distance
 * @param {number} blockWidthPx - Width of the block in pixels
 * @param {number} blockHeightPx - Height of the block in pixels
 * @param {number} minBlockDistance - Minimum distance between blocks
 * @param {number} xStart - Start x position
 * @param {number} xEnd - End x position
 * @param {number} yStart - Start y position
 * @param {number} yEnd - End y position
 * @returns {Object} Object containing valid blockX and blockY coordinates
 */
function createBlockPosition(existingBlocks, blockWidthPx, blockHeightPx, minBlockDistance, xStart, xEnd, yStart, yEnd) {
    let blockX, blockY, tries = 0;
    while (!validPosition && tries < 100) {
        blockX = xStart + Math.random() * (xEnd - xStart - blockWidthPx);
        blockY = yStart + Math.random() * (yEnd - yStart - blockHeightPx);
        validPosition = true;
        ({ blockX, blockY } = findValidBlockPosition(existingBlocks, blockX, blockY, blockWidthPx, blockHeightPx, minBlockDistance));
        tries++;
    }
    return { blockX, blockY };
}


/**
 * This function checks if the randomly generated block position is valid by ensuring it does not overlap with existing 
 * blocks within a specified minimum distance.
 * 
 * @param {Array} existingBlocks - Array of existing block positions to check against for minimum distance
 * @param {number} blockWidthPx - Width of the block in pixels
 * @param {number} blockHeightPx - Height of the block in pixels
 * @param {number} minBlockDistance - Minimum distance between blocks
 * @param {number} xStart - Start x position
 * @param {number} xEnd - End x position
 * @param {number} yStart - Start y position
 * @param {number} yEnd - End y position
 * @returns {Object} Object containing valid blockX and blockY coordinates
 */
function findValidBlockPosition(existingBlocks, blockX, blockY, blockWidthPx, blockHeightPx, minBlockDistance) {
    for (const block of existingBlocks) {
            const dx = blockX - block.x;
            const dy = blockY - block.y;
            if (Math.abs(dx) < blockWidthPx + minBlockDistance && Math.abs(dy) < blockHeightPx + minBlockDistance) {
                validPosition = false;
                break;
            }
        }
    return { blockX, blockY };
}
    


/**
 * This function creates a 2x2 block of coins at the specified x and y coordinates, with each coin spaced according to 
 * the given block width and height.
 * 
 * @param {number} blockX - The x coordinate of the top-left corner of the block
 * @param {number} blockY - The y coordinate of the top-left corner of the block
 * @param {number} blockWidthPx - The width of the block in pixels
 * @param {number} blockHeightPx - The height of the block in pixels
 */
function createCoinBlock(blockX, blockY, blockWidthPx, blockHeightPx) {
    for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const x = blockX + i * blockWidthPx;
                const y = blockY + j * blockHeightPx;
                coins.push(new Coin(x, y));
            }
        }
}