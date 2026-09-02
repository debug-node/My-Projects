// Elements
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const resetBtn = document.getElementById("resetBtn");
const counterDisplay = document.getElementById("counterDisplay");
const toggleModeBtn = document.getElementById("toggleModeBtn");

let counterValue = 0;

// Functions
function updateCounterDisplay() {
    counterDisplay.textContent = counterValue;
    counterDisplay.classList.add('animate');
    setTimeout(() => counterDisplay.classList.remove('animate'), 300);
}

function incrementCounter() {
    counterValue++;
    updateCounterDisplay();
}

function decrementCounter() {
    if (counterValue > 0) {
        counterValue--;
        updateCounterDisplay();
    }
}

function resetCounter() {
    counterValue = 0;
    updateCounterDisplay();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    // Change button text/icon
    if (document.body.classList.contains("dark-mode")) {
        toggleModeBtn.textContent = "☀️ Light Mode";
    } else {
        toggleModeBtn.textContent = "🌙 Dark Mode";
    }
}

// Event Listeners
incrementBtn.addEventListener("click", incrementCounter);
decrementBtn.addEventListener("click", decrementCounter);
resetBtn.addEventListener("click", resetCounter);
toggleModeBtn.addEventListener("click", toggleDarkMode);
