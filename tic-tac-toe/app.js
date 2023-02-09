const tablecells = document.querySelectorAll('.tic-tac-toe td');
const resetButton = document.querySelector('.reset button');
const turnContainer = document.querySelector('.turn span');

class TicTacToe {

  constructor() {
    // Events
    tablecells.forEach(tablecell => tablecell.addEventListener('click', (e) => this.playMove(e)));
    resetButton.addEventListener('click', this.newGame.bind(this));

    // Start the first game
    this.newGame();
  }

  newGame() {
    this.updateCurrentPlayer(true);

    tablecells.forEach(tablecell => tablecell.innerHTML = '');

    this.optionsPlayed = { 
      'X': { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
      'O': { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
    };
  }

  updateCurrentPlayer(newGame = false) {
    if (!newGame) {
      this.player = (this.player == 'X') ? "O" : 'X';
    } else {
      this.player = 'X';
    }
  
    turnContainer.innerHTML = this.player;
  }

  playMove(e) {
    if (e.currentTarget.firstChild) return;
    
    e.target.insertAdjacentHTML('afterbegin', this.player == 'X' ? `<span class="x"></span>` : `<span class="o"></span>`);

    if (!this.isWinner(e.target)) this.updateCurrentPlayer();
  }

  isWinner(cell) {
    let patternPlayed = this.optionsPlayed[this.player];
    let currentCellPatternNumbers = cell.classList;

    for (let number of currentCellPatternNumbers) {
      patternPlayed[number]++;
      
      if (patternPlayed[number] == 3) {
        // sheduling gameWon() so browser has a chance to render a move
        setTimeout(() => this.gameWon(), 0);
        return true;
      }
    }
  }

  gameWon() {
    alert((this.player == 'X') ? 'Player X won the game!' : 'Player O won the game!');
    this.newGame();
  }
}

const game = new TicTacToe();