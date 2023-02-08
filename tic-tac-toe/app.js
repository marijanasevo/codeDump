const tablecells = Array.from(document.querySelectorAll('.tic-tac-toe td'));
const reset = document.querySelector('.reset button');

let playerOne;
let playerOneField, playerTwoField;
newGame();

function newGame() {
  playerOne = true;
  tablecells.forEach(tablecells => tablecells.innerHTML = '');

  function resetField() {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
  }

  playerOneField = resetField();
  playerTwoField = resetField();
}

function playMove() {
  if (this.firstChild) return;

  this.insertAdjacentHTML('afterbegin', playerOne ? `<span class="x"></span>` : `<span class="circle"></span>`);

  let patternNumbers = this.classList;

  let field = (playerOne) ? playerOneField : playerTwoField;

  for (let number of patternNumbers) {
    field[number]++;
    if (field[number] == 3) {
      gameWon(playerOne);
      return;
    }
  }

  playerOne = !playerOne;
}

function gameWon(playerOne) {
  alert((playerOne) ? 'Player X won the game!' : 'Player O won the game!');
  newGame();
}

tablecells.forEach(tablecell => tablecell.addEventListener('click', playMove));
reset.addEventListener('click', newGame);