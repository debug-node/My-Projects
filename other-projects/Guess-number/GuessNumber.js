let number = Math.floor(Math.random() * 100) + 1;
let chances = 0;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const chancesText = document.getElementById("chances");

guessBtn.addEventListener("click", () => {
  const guess = Number.parseInt(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "❌ Enter a valid number (1-100)";
    return;
  }

  chances++;
  chancesText.textContent = chances;

  if (guess > number) {
    message.textContent = "📈 Too high! Try again";
  }
  else if (guess < number) {
    message.textContent = "📉 Too low! Try again";
  }
  else {
    const score = 100 - chances;
    message.textContent = `🎉 Correct! Number was ${number}. Score: ${score}`;
    guessBtn.disabled = true;
  }

  guessInput.value = "";
});