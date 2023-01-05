// const gameCell = document.querySelectorAll('[data--cell]');
// const outputField = document.querySelector('.output-field');
// const resetButton = document.querySelector('.reset-button');
// const playerXScore = document.querySelector('.playerXScore');
// const playerOScore = document.querySelector('.playerOScore');
//
// const xPositions = [];
// const oPositions = [];
//
// let xScore = 0;
// let oScore = 0;
//
// const winCombinations = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7],
// ];
//
// let currentPlayer = 'X';
//
// function clearPositions(positions) {
//     positions.splice(0, positions.length);
// }
// function start() {
//     gameCell.forEach((cell) => {
//         cell.innerHTML = '';
//         clearPositions(xPositions);
//         clearPositions(oPositions);
//         outputField.innerHTML = 'Player X move';
//         cell.removeEventListener('click', clickHandler)
//         cell.addEventListener('click', clickHandler, {once: true});
//     });
// }
//
// start();
//
// function savePlayerPosition (array ,cell) {
//     array.push(parseInt(cell.className.slice(-1)));
// }
//
// function clickHandler(event) {
//     const selectedCell = event.target;
//     if (!this.innerText) {
//         this.innerText = currentPlayer;
//     }
//     if (this.innerText === 'X') {
//         savePlayerPosition(xPositions, selectedCell);
//     } else if (this.innerText === 'O') {
//         savePlayerPosition(oPositions, selectedCell);
//     }
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     outputField.innerHTML = `Player ${currentPlayer} move`;
//     declareWinner(xPositions, oPositions, winCombinations);
//     checkForDraw(xPositions, checkForWin);
// }
//
// function declareWinner (xPositions, oPositions, winCombinations) {
//     if (checkForWin(xPositions, winCombinations) === true) {
//         xScore++;
//         outputField.innerHTML = 'Player X wins';
//         localStorage.setItem('xScore', xScore.toString());
//         playerXScore.innerHTML = `Player X: ${localStorage.getItem('xScore')}`;
//     } else if (checkForWin(oPositions, winCombinations) === true) {
//         oScore++;
//         outputField.innerHTML = 'Player O wins';
//         localStorage.setItem('oScore', oScore.toString());
//         playerOScore.innerHTML = `Player O: ${localStorage.getItem('oScore')}`;
//     }
// }
//
// function checkForWin (playerPositions, winCombinations) {
//     return winCombinations.some(combination => combination.every(index => playerPositions.includes(index)));
// }
//
// function checkForDraw (xPositions, func) {
//     if (xPositions.length === 5 && func(xPositions, winCombinations) === false) {
//         outputField.innerHTML = 'Draw!';
//     }
// }
//
// resetButton.addEventListener('click', start);


const boardElement = document.querySelector('[data-board]');
const cellTemplateElement = document.querySelector('[data-cell-template]');
const rowTemplateElement = document.querySelector('[data-row-template]');
const dataFieldElement = boardElement.querySelector('[data-field]');

function generateField (numberOfCells) {
    const field = [];
    const row = [];

    for (let i = 0; i < numberOfCells; i++) {
        row.push('');
    }

    for (let i = 0; i < numberOfCells; i++) {
        field.push(row);
    }

    return field;
}

const fieldData = generateField(4);

function createRow(cells) {
    const rowElement = rowTemplateElement.content.cloneNode(true);
    const rowContainerElement = rowElement.querySelector('.board-row');

    rowContainerElement.append(...cells);

    return rowElement;
}

function createCell(text, y, x) {
    const cellElement = cellTemplateElement.content.cloneNode(true);
    const textElement = cellElement.querySelector('.board-cell');

    textElement.innerText = text + x + ',' + y;
    textElement.dataset.x = x;
    textElement.dataset.y = y;

    return cellElement;
}


function renderBoard(fieldData) {
    // Clear field
    dataFieldElement.innerHTML = '';

    const rowElements = fieldData.map((row, rowIndex) => {
        const cellElements = row.map((cell, cellIndex) => createCell(cell, rowIndex, cellIndex));

        return createRow(cellElements);
    });

    dataFieldElement.append(...rowElements);
}

renderBoard(fieldData);