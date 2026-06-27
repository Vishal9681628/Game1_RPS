let coin = parseInt(prompt("Enter the number of rounds you want to play:"));

let humanScore = 0;
let computerScore = 0;

// Function to get computer's choice
function getComputerChoice() {
  let value = Math.floor(Math.random() * 3);

  if (value === 0) {
    return "rock";
  } else if (value === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Function to get human's choice
function getHumanChoice() {
  let choice = prompt("Select your choice:\n1. Rock\n2. Paper\n3. Scissors");

  if (choice === "1") {
    return "rock";
  } else if (choice === "2") {
    return "paper";
  } else if (choice === "3") {
    return "scissors";
  } else {
    return choice.toLowerCase();
  }
}

// Function to play one round
function playRound(humanChoice, computerChoice) {
  // Check for invalid input
  if (
    humanChoice !== "rock" &&
    humanChoice !== "paper" &&
    humanChoice !== "scissors"
  ) {
    console.log("❌ Invalid Choice!");
    return;
  }

  console.log("-------------------------");
  console.log("You Chose      :", humanChoice);
  console.log("Computer Chose :", computerChoice);

  if (humanChoice === computerChoice) {
    console.log("🤝 It's a Draw!");
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log("✅ You Win This Round!");
    humanScore++;
  } else {
    console.log("❌ Computer Wins This Round!");
    computerScore++;
  }

  console.log("Score");
  console.log("You      :", humanScore);
  console.log("Computer :", computerScore);
}

// Main Game Loop
while (coin > 0) {
  console.log("\nRound :", coin);

  let computerChoice = getComputerChoice();
  let humanChoice = getHumanChoice();

  playRound(humanChoice, computerChoice);

  coin--;
}

// Final Result
console.log("\n======================");
console.log("Final Score");
console.log("You      :", humanScore);
console.log("Computer :", computerScore);

if (humanScore > computerScore) {
  console.log("🎉 Congratulations! You Won the Game.");
} else if (computerScore > humanScore) {
  console.log("💻 Computer Won the Game.");
} else {
  console.log("🤝 The Game Ended in a Draw.");
}