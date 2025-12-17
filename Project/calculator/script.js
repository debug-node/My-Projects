let currentDisplay = '';
const display = document.querySelector('#display');

function updateDisplay() {
    display.value = currentDisplay;
    autoResize();
}

function autoResize() {
    let maxSize = 30;
    let minSize = 16;

    let size = maxSize;

    display.style.fontSize = size + "px";

    while (display.scrollWidth > display.clientWidth && size > minSize) {
        size--;
        display.style.fontSize = size + "px";
    }

    if (size === minSize && display.scrollWidth > display.clientWidth) {
        currentDisplay = currentDisplay.slice(0, -1);
        display.value = currentDisplay;
    }
}

function press(value) {
    currentDisplay += value;
    updateDisplay();
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    currentDisplay = '';
    updateDisplay();
}

function calculate() {
    try {
        currentDisplay = eval(currentDisplay);
    } catch {
        currentDisplay = "Error";
    }
    updateDisplay();
}

updateDisplay();