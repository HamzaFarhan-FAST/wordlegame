let WORD_LIST = ["apple", "mango", "grape", "lemon", "peach", "melon", "olive", "guava", "dates", "prune", "plums", "pears", "berry", "cacao", "papaw", "onion", "leeks", "beans", "kales", "okras", "maize", "beets", "cress", "chili", "carob", "herbs", "mints", "basil", "corns"];
let BENEFITS = [
  "Apples are rich in fiber and vitamin C. They support heart health and may help with weight management.",
  "Mangoes are packed with vitamins A and C. They boost immunity and promote healthy skin.",
  "Grapes contain antioxidants that support heart health and may reduce inflammation.",
  "Lemons are excellent sources of vitamin C and can aid digestion and boost immunity.",
  "Peaches are rich in vitamins A and C, supporting skin health and immune function.",
  "Melons are hydrating fruits rich in vitamins and minerals, perfect for hot weather.",
  "Olives are rich in healthy fats and antioxidants, supporting heart and brain health.",
  "Guavas are super fruits packed with vitamin C, fiber, and antioxidants.",
  "Dates are natural energy boosters rich in fiber, potassium, and minerals.",
  "Prunes aid digestion and are rich in antioxidants and vitamins.",
  "Plums are low in calories and rich in vitamins that support bone health.",
  "Pears are high in fiber and help with digestion and heart health.",
  "Berries are antioxidant powerhouses that support brain health and immunity.",
  "Cacao is rich in antioxidants and can improve mood and heart health.",
  "Papaw (Papaya) aids digestion with enzymes and is rich in vitamins A and C.",
  "Onions have anti-inflammatory properties and support immune system health.",
  "Leeks are rich in vitamins K and A, supporting bone and eye health.",
  "Beans are excellent sources of protein and fiber, promoting heart health.",
  "Kales are nutrient-dense superfoods packed with vitamins, minerals, and antioxidants.",
  "Okras are high in fiber and vitamin C, supporting digestive health.",
  "Maize (Corn) provides energy and contains beneficial plant compounds and fiber.",
  "Beets support blood pressure regulation and athletic performance.",
  "Cress is packed with vitamins and minerals, supporting bone health.",
  "Chili peppers boost metabolism and are rich in vitamin C.",
  "Carob is a healthy chocolate alternative rich in fiber and antioxidants.",
  "Herbs provide various health benefits including anti-inflammatory properties.",
  "Mints aid digestion and can help relieve headaches and freshen breath.",
  "Basil has anti-inflammatory properties and is rich in antioxidants.",
  "Corns provide energy, fiber, and essential nutrients for overall health."
];

let secret = "";
let secretIndex = -1;
let attempts = [];
const MAX_ATTEMPTS = 6;

document.addEventListener("DOMContentLoaded", function() {
  
  document.getElementById("rulesModal").classList.add("active", "rules-active");
  startGame();

  document.getElementById("guessInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      submitGuess();
    }
  });
});

function startGame() {
  attempts = [];
  secretIndex = Math.floor(Math.random() * WORD_LIST.length);
  secret = WORD_LIST[secretIndex].toLowerCase();
  document.getElementById("grid").innerHTML = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("message").innerHTML = "";
  document.getElementById("guessInput").focus();
}

function restartGame() {
  closeModal();
  startGame();
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
  document.getElementById("message").textContent = "";
  
  if (guess === secret) {
    setTimeout(() => showResultModal(true), 500);
    document.getElementById("guessInput").disabled = true;
  } else if (attempts.length >= MAX_ATTEMPTS) {
    setTimeout(() => showResultModal(false), 500);
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

function showResultModal(isWin) {
  const modal = document.getElementById("resultModal");
  const resultContent = document.getElementById("resultContent");
  const resultTitle = document.getElementById("resultTitle");
  const resultWord = document.getElementById("resultWord");
  const benefitsText = document.getElementById("benefitsText");

  if (isWin) {
    resultTitle.textContent = " You Win! ";
    resultContent.classList.add("win");
    resultContent.classList.remove("lose");
  } else {
    resultTitle.textContent = " Game Over ";
    resultContent.classList.add("lose");
    resultContent.classList.remove("win");
  }

  resultWord.textContent = secret.toUpperCase();
  benefitsText.textContent = BENEFITS[secretIndex];

  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("resultModal").classList.remove("active");
}

function playAgain() {
  restartGame();
}

function showWordListEditor() {
  alert("Hint: The word is a fruit or vegetable from the dictionary!");
}


function showRulesModal() {
  document.getElementById("rulesModal").classList.add("active", "rules-active");
}
function closeRulesModal() {
  document.getElementById("rulesModal").classList.remove("active", "rules-active");
}
