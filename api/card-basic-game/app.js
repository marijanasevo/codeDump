let deckId = '';

const roundScore = document.querySelector('.round-result');
const score = document.querySelector('.score');
const cardOne = document.getElementById('player1');
const cardTwo = document.getElementById('player2');
const drawButton = document.querySelector('button');

let totalPlayerOne = 0;
let totalPlayerTwo = 0;

let points;

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    deckId = data.deck_id;
  })
  .catch(err => {
    console.log(err);
  });

function drawTwo() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      cardOne.src = data.cards[0].images.png;
      cardTwo.src = data.cards[1].images.png;
      let playerOnePoints = cardToNumber(data.cards[0].value);
      let playerTwoPoints = cardToNumber(data.cards[1].value);

      points = playerOnePoints - playerTwoPoints;

      if (playerOnePoints > playerTwoPoints) {
        roundScore.innerHTML = `Player 1 wins by ${points} points`;
        totalPlayerOne += points;
      } else if (playerOnePoints < playerTwoPoints) {
        roundScore.innerHTML = `Player 2 wins by ${-points} points`;
        totalPlayerTwo += -points;
      } else {
        roundScore.innerHTML = "It's a war";
      }

      score.innerHTML = `Score: ${totalPlayerOne}:${totalPlayerTwo}`;
    })
    .catch(err => {
      console.log(`name: ${err.name}; message: ${err.message}; stack: ${err.stack}`);
    });
}

function cardToNumber(val) {
  if (val === 'ACE') return 14;
  if (val === 'KING') return 13;
  if (val === 'QUEEN') return 12;
  if (val === 'JACK') return 11;
  
  return +val;
}

drawButton.addEventListener('click', drawTwo);