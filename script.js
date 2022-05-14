'use strict';

class App {
    btnRoll = this._select('.btn--roll');
    btnHold = this._select('.btn--hold');
    btnNew = this._select('.btn--new');
    diceEl = this._select('.dice');
    players = Array.from(document.querySelectorAll('.player'));

    activePlayer = 0;
    curScore = 0;
    scores = this.players.map(pl => 0);
    winningScore = 10;
    playing = true;

    constructor() {
        this._init();
        this.btnRoll.addEventListener('click', this._playGame.bind(this));
        this.btnHold.addEventListener('click', this._switchPlayer.bind(this));
        this.btnNew.addEventListener('click', this._init.bind(this));
    }

    _playGame() {
        if (!this.playing) return;

        this.diceEl.classList.remove('hidden');
        const dice = Math.trunc(Math.random() * 6) + 1;
        this.diceEl.src = `img/dice-${dice}.png`;

        if (dice !== 1) {
            this.curScore += dice;
            document.querySelector(`#current--${this.activePlayer}`).textContent = this.curScore;
        } else {
            this.curScore = 0;
            this._switchPlayer();
        }
    }

    _switchPlayer() {
        if (!this.playing) return;

        this.scores[this.activePlayer] += this.curScore;
        document.querySelector(`#score--${this.activePlayer}`).textContent = this.scores[this.activePlayer];

        this.curScore = 0;
        document.querySelector(`#current--${this.activePlayer}`).textContent = this.curScore;
        this.players.forEach(pl => pl.classList.remove('player--active'));

        if (this.scores[this.activePlayer] >= this.winningScore) {
            this.players[this.activePlayer].classList.add('player--winner');
            this.playing = false;
        } else {
            this.activePlayer++;
            this.activePlayer = this.activePlayer < this.players.length ? this.activePlayer : 0;
            this.players[this.activePlayer].classList.add('player--active');
        }

    }

    _select(el) {
        return document.querySelector(el);
    }

    _init() {
        this.playing = true;
        this.activePlayer = 0;
        this.curScore = 0;
        this.scores = this.players.map(pl => 0);

        document.querySelector(`#current--${this.activePlayer}`).textContent = this.curScore;
        this.players.forEach((pl, i) => document.querySelector(`#score--${i}`).textContent = 0);
        this.diceEl.classList.add('hidden');

        this.players.forEach(pl => pl.classList.remove('player--active'));
        this.players.forEach(pl => pl.classList.remove('player--winner'));
        this.players[0].classList.add('player--active');
    }
}

const app = new App();
console.log(app);