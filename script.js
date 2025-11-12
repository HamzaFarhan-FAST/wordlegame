// --- EDITABLE WORD LIST ---
let WORD_LIST = ["apple", "mango", "grape", "lemon", "peach", "melon", "olive", "guava", "dates", "prune", "plums", "pears", "berry", "cacao", "papaw", "onion", "leeks", "beans", "kales", "okras", "maize", "beets", "cress", "chili", "carob", "herbs", "mints", "basil", "corns"];
let secret = "";
let attempts = [];
const MAX_ATTEMPTS = 6;

// --- NEW GAME START ---
startGame();

function startGame() {
  attempts = [];
  secret = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toLowerCase();
  document.getElementById("grid").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("message").innerHTML = "";
}

function submitGuess() {
  let guess = document.getElementById("guessInput").value.trim().toLowerCase();
  if (guess.length !== 5) {
    document.getElementById("message").textContent = "Enter a 5-letter word!";
    return;
  }
  if (!WORD_LIST.includes(guess)) {
    document.getElementById("message").textContent = "Word not in dictionary!";
    return;
  }
  attempts.push(guess);
  renderGrid();
  document.getElementById("guessInput").value = "";
  if (guess === secret) {
    document.getElementById("message").textContent = "You Win! The word was " + secret.toUpperCase();
    document.getElementById("guessInput").disabled = true;
  } else if (attempts.length >= MAX_ATTEMPTS) {
    document.getElementById("message").textContent = "Game Over! The word was " + secret.toUpperCase();
    document.getElementById("guessInput").disabled = true;
  }
}

function renderGrid() {
  let gridHTML = "";
  for (let word of attempts) {
    let row = "";
    let target = secret.split("");
    let guess = word.split("");
    let result = Array(5).fill("wrong");
    let targetUsed = Array(5).fill(false);

    
    for (let i = 0; i < 5; i++) {
      if (guess[i] === target[i]) {
        result[i] = "correct";
        targetUsed[i] = true;
      }
    }

    
    for (let i = 0; i < 5; i++) {
      if (result[i] === "correct") continue;
      for (let j = 0; j < 5; j++) {
        if (!targetUsed[j] && guess[i] === target[j]) {
          result[i] = "misplaced";
          targetUsed[j] = true;
          break;
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      row += `<div class="grid-box ${result[i]}">${guess[i].toUpperCase()}</div>`;
    }

    gridHTML += `<div class="grid-row">${row}</div>`;
  }
  document.getElementById("grid").innerHTML = gridHTML;
}


