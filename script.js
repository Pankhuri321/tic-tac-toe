const board = document.getElementById('board');
const info = document.getElementById('info');
const resetBtn = document.getElementById('reset');
let cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if(gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for(let condition of winningConditions) {
        const [a, b, c] = condition;
        if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]){
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        info.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!gameState.includes('')) {
        info.textContent = `It's a Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    info.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    info.textContent = `Current Player: ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
