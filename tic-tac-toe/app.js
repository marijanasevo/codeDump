const tablecells = document.querySelectorAll('.tic-tac-toe td');
const resetButton = document.querySelector('.reset button');
const turnContainer = document.querySelector('.turn span');

function TicTacToe() {

  // Events
  tablecells.forEach(tablecell => tablecell.addEventListener('click', (e) => playMove(e)));
  resetButton.addEventListener('click', () => newGame());

  let player;
  let optionsPlayed;

  // Start the first game
  newGame();

  function newGame() {
    updateCurrentPlayer(true);

    tablecells.forEach(tablecell => tablecell.innerHTML = '');

    optionsPlayed = { 
      'X': { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
      'O': { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
    };
  }

  function updateCurrentPlayer(newGame = false) {
    if (!newGame) {
      player = (player == 'X') ? "O" : 'X';
    } else {
      player = 'X';
    }
  
    turnContainer.innerHTML = player;
  }

  function playMove(e) {
    if (e.currentTarget.firstChild) return;
    
    e.target.insertAdjacentHTML('afterbegin', player == 'X' ? `<span class="x"></span>` : `<span class="o"></span>`);

    if (!isWinner(e.target)) updateCurrentPlayer();
  }

  function isWinner(cell) {
    let patternPlayed = optionsPlayed[player];
    let currentCellPatternNumbers = cell.classList;

    for (let number of currentCellPatternNumbers) {
      patternPlayed[number]++;
      
      if (patternPlayed[number] == 3) {
        // sheduling gameWon() so browser has a chance to render a move
        setTimeout(() => gameWon(), 0);
        return true;
      }
    }
  }

  function gameWon() {
    alert((player == 'X') ? 'Player X won the game!' : 'Player O won the game!');
    newGame();
  }
}

const game = new TicTacToe();