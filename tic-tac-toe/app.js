const tablecells = Array.from(document.querySelectorAll('.tic-tac-toe td'));
const reset = document.querySelector('.reset button');
const turn = document.querySelector('.turn span');

let player;
let xOptionsPlayed, oOptionsPlayed;
newGame();

function newGame() {
  updateCurrentPlayer(true);

  tablecells.forEach(tablecell => tablecell.innerHTML = '');

  xOptionsPlayed = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
  oOptionsPlayed = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
}

function playMove() {
  if (this.firstChild) return;
  
  this.insertAdjacentHTML('afterbegin', player == 'X' ? `<span class="x"></span>` : `<span class="o"></span>`);

  if (!isWinner(this)) updateCurrentPlayer();
}

function isWinner(cell) {
  let patternPlayed = (player == 'X') ? xOptionsPlayed : oOptionsPlayed;
  let currentCellPatternNumbers = cell.classList;

  for (let number of currentCellPatternNumbers) {
    patternPlayed[number]++;
    
    if (patternPlayed[number] == 3) {
      // sheduling gameWon() so browser has a chance to render a move
      setTimeout(() => gameWon(player), 0);
      return true;
    }
  }
}

function updateCurrentPlayer(newGame = false) {
  if (!newGame) {
    player = (player == 'X') ? "O" : 'X';
  } else {
    player = 'X';
  }

  turn.innerHTML = player;
}

function gameWon(player) {
  alert((player == 'X') ? 'Player X won the game!' : 'Player O won the game!');
  newGame();
}

tablecells.forEach(tablecell => tablecell.addEventListener('click', playMove));
reset.addEventListener('click', newGame);