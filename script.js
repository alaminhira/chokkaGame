'use strict';
const _ = function(el) {
    return document.querySelector(el);
}

const player1 = _('.player--0'),
    player2 = _('.player--1'),
    score1 = _('#score--0'),
    score2 = _('#score--1'),
    current1 = _('#current--0'),
    current2 = _('#current--1'),
    dice = _('.dice'),
    btnNew = _('.btn--new'),
    btnRoll = _('.btn--roll'),
    btnHold = _('.btn--hold');

let scores, currentScore, playing, activePlayer;
// Starting conditions
const init = function() {
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score1.textContent = 0;
    score2.textContent = 0;
    current1.textContent = 0;
    current2.textContent = 0;

    dice.classList.add('hidden');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
}

init();

const switchPlayer = function() {
    _(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

// Rolling dice functionality
const startGmae = function() {
    if (playing) {
        // 1. Generating a random dice number
        let diceNum = Math.trunc(Math.random() * 6) + 1;
        // 2 Display dice
        dice.classList.remove('hidden')
        dice.src = `dice-${diceNum}.png`;
    
        // 3. Check for rolld 1
        if (diceNum !== 1) {
            // Add dice to current score
            currentScore += diceNum;
            _(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
}

const holdPoint = function() {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore; 
        _(`#score--${activePlayer}`).textContent = scores[activePlayer];
        // Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add('hidden');
            _(`.player--${activePlayer}`).classList.add('player--winner');
            _(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
}

btnRoll.addEventListener('click', startGmae);
btnHold.addEventListener('click', holdPoint);
btnNew.addEventListener('click', init);