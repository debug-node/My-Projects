// Elements
const coin = document.querySelector("#coin");
const flipBtn = document.querySelector("#flip");
const resetBtn = document.querySelector("#reset");
const statusLabel = document.querySelector("#status");
const headsDisplay = document.querySelector("#headsCount");
const tailsDisplay = document.querySelector("#tailsCount");
const flipSound = document.querySelector("#flipSound");

let headsCount = 0;
let tailsCount = 0;
let isAnimating = false;

function updateDisplays() {
  headsDisplay.textContent = headsCount;
  tailsDisplay.textContent = tailsCount;
}

function processResult(result) {
  if (result === "heads") headsCount++;
  else tailsCount++;

  updateDisplays();
  statusLabel.textContent = result.toUpperCase();
}

/**
 * Flip the coin:
 * - disable controls while animating
 * - play flip sound
 * - add animation class
 * - after animation finishes, update counts & re-enable controls
 */
function flipCoin() {
  if (isAnimating) return;

  isAnimating = true;
  flipBtn.disabled = true;
  resetBtn.disabled = true;

  // Determine result
  const result = Math.random() < 0.5 ? "heads" : "tails";

  // Reset animation classes first to allow re-trigger
  coin.classList.remove("animate-heads", "animate-tails");

  // Small delay to ensure class removal is applied before adding new class
  setTimeout(() => {
    // Play sound (user gesture ensures playback in most browsers)
    try {
      // rewind and play
      flipSound.currentTime = 0;
      flipSound.play().catch(() => {
        /* ignore autoplay errors */
      });
    } catch (e) { /* ignore if audio element missing */ }

    coin.classList.add("animate-" + result);
  }, 50);

  // Wait for the animation duration (3s) + small buffer
  const ANIM_DURATION_MS = 3000;
  setTimeout(() => {
    processResult(result);
    isAnimating = false;
    flipBtn.disabled = false;
    resetBtn.disabled = false;
  }, ANIM_DURATION_MS + 100);
}

function resetCounts() {
  if (isAnimating) return; // avoid resetting mid-animation
  headsCount = 0;
  tailsCount = 0;
  statusLabel.textContent = "";
  updateDisplays();
}

// Event listeners
flipBtn.addEventListener("click", flipCoin);
resetBtn.addEventListener("click", resetCounts);

// Optional: keyboard accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    // Space or Enter triggers flip if focus is on body (avoid interfering with focused buttons)
    if (document.activeElement === document.body) {
      e.preventDefault();
      flipCoin();
    }
  }
});



