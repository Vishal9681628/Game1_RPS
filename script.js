// --- Element references ---
const humanScoreEl = document.querySelector("#humanScore");
const computerScoreEl = document.querySelector("#computerScore");
const resultEl = document.querySelector("#result");
const choicesEl = document.querySelector("#choices");
const finalEl = document.querySelector("#final");
const finalHeadline = document.querySelector("#finalHeadline");
const finalSub = document.querySelector("#finalSub");
const resetBtn = document.querySelector("#resetBtn");

// --- State ---
let humanScore = 0;
let computerScore = 0;
const WINNING_SCORE = 5;

// --- Pure logic (no DOM, no I/O — reusable) ---
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
}

// Returns "win" | "lose" | "draw" from the human's point of view
function getOutcome(human, computer) {
  if (human === computer) return "draw";
  const humanWins =
    (human === "rock" && computer === "scissors") ||
    (human === "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper");
  return humanWins ? "win" : "lose";
}

// --- One round, driven by whichever button was clicked ---
function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  const outcome = getOutcome(humanChoice, computerChoice);

  if (outcome === "win") humanScore++;
  if (outcome === "lose") computerScore++;

  renderRound(humanChoice, computerChoice, outcome);
  updateScore();

  if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    endGame();
  }
}

// --- Rendering helpers (all DOM writes live here) ---
function updateScore() {
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
}

function renderRound(human, computer, outcome) {
  const messages = {
    win: "You win this round",
    lose: "Computer wins this round",
    draw: "It's a draw",
  };
  resultEl.className = "result " + outcome;
  resultEl.innerHTML =
    messages[outcome] +
    `<span class="detail">You: ${human} · Computer: ${computer}</span>`;
}

function endGame() {
  const humanWon = humanScore > computerScore;
  choicesEl.classList.add("hidden");
  finalEl.classList.remove("hidden");
  finalHeadline.textContent = humanWon ? "You won! 🎉" : "Computer won 💻";
  finalHeadline.className = "headline " + (humanWon ? "win" : "lose");
  finalSub.textContent = `Final score ${humanScore}–${computerScore}`;
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateScore();
  resultEl.className = "result";
  resultEl.textContent = "Pick a move to start.";
  finalEl.classList.add("hidden");
  choicesEl.classList.remove("hidden");
}

// --- Wiring: one listener for all three buttons (event delegation) ---
choicesEl.addEventListener("click", (event) => {
  const button = event.target.closest(".choice");
  if (!button) return; // clicked the gap, not a button
  playRound(button.dataset.choice);
});

resetBtn.addEventListener("click", resetGame);
