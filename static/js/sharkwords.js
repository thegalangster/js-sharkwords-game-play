const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const WORDS = [
  "strawberry",
  "orange",
  "apple",
  "banana",
  "pineapple",
  "kiwi",
  "peach",
  "pecan",
  "eggplant",
  "durian",
  "peanut",
  "chocolate",
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector("#word-container");
  for (const letter of word) {
    wordContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="letter-box ${letter}"></div>`
    );
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector("#letter-buttons");
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML(
      "beforeend",
      `<button>${char}</button>`
    );
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  return document.querySelector(`div.${letter}`) !== null;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const letter_divs = document.querySelectorAll(`div.${letter}`);
  for (const letter_div of letter_divs) {
    if (letter_div.innerHTML === "") {
        letter_div.innerHTML = letter;
    }
  }
  let won = true;
  const all_divs = document.querySelectorAll('div');
  for (const all_div of all_divs) {
    if (all_div.innerHTML === "") {
      won = false;
    }
  }
  if (won === true) {
    document.querySelector('#win').style.display = '';
    document.querySelector('#play-again').style.display = '';
  }
};
// The following returns false because the <div> element doesn’t have the error class:

// const div = document.querySelector('.info');
// div.classList.contains('error')
//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.


const handleWrongGuess = () => {
  const divs = document.querySelectorAll('.letter-box');
  for (const div of divs) {
    numWrong += 1;
    document.querySelector('img').setAttribute('src', `/static/images/guess${numWrong}.png`);
    if (numWrong === 5) {
      buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        disableLetterButton(button);
      }
    document.querySelector('#play-again').style.display = '';
    }
    return;
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = "/sharkwords";
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = "hello";

  createDivsForChars(word);
  generateLetterButtons();

  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    button.addEventListener('click', (evt) => {
      const targetButton = evt.target;
      letter = targetButton.innerHTML;
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess(letter);
      }
    });
  }
  const playAgain = document.querySelector('#play-again');
  playAgain.addEventListener('click', () => {
    resetGame();
  });


})();
