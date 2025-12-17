console.log("JS Initializing");

const boxes = document.querySelector(".container").children;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

setInterval(() => {
    Array.from(boxes).forEach(box => {
        box.style.backgroundColor = getRandomColor();
        box.style.color = getRandomColor();
    });
}, 200);
