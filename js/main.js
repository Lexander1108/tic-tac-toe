const gameCell = document.querySelectorAll('[data--cell]');
const outputField = document.querySelector('.output-field');
const resetButton = document.querySelector('.reset-button');

const xPositions = [];
const oPositions = [];

const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let currentPlayer = 'X';

function clearPositions(positions) {
    positions.splice(0, positions.length);
}
function start() {
    gameCell.forEach((cell) => {
        cell.innerHTML = '';
        clearPositions(xPositions);
        clearPositions(oPositions);
        outputField.innerHTML = 'Player X move';
        cell.removeEventListener('click', clickHandler)
        cell.addEventListener('click', clickHandler, {once: true});
    });
}

start();

function savePlayerPosition (array ,cell) {
    array.push(parseInt(cell.className.slice(-1)));
}

function clickHandler(event) {
    const selectedCell = event.target;
    if (!this.innerText) {
        this.innerText = currentPlayer;
    }
    if (this.innerText === 'X') {
        savePlayerPosition(xPositions, selectedCell);
    } else if (this.innerText === 'O') {
        savePlayerPosition(oPositions, selectedCell);
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    outputField.innerHTML = `Player ${currentPlayer} move`;
    declareWinner(xPositions, oPositions, winCombinations);
    checkForDraw(xPositions, checkForWin);
}

function declareWinner (xPositions, oPositions, winCombinations) {
    if (checkForWin(xPositions, winCombinations) === true) {
        outputField.innerHTML = 'Player X win';
    } else if (checkForWin(oPositions, winCombinations) === true) {
        outputField.innerHTML = 'Player O win';
    }
}

function checkForWin (playerPositions, winCombinations) {
    return winCombinations.some(combination => combination.every(index => playerPositions.includes(index)));
}

function checkForDraw (xPositions, func) {
    if (xPositions.length === 5 && func(xPositions, winCombinations) === false) {
        outputField.innerHTML = 'Draw!';
    }
}

resetButton.addEventListener('click', start);