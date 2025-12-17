const box = document.getElementById("box");

// ✔ Matte dark gradients (best for neon shapes)
const gradients = [
    "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
    "linear-gradient(135deg, #0c0c0f, #1b1b23)",
    "linear-gradient(135deg, #050505, #0f0f0f)",
    "linear-gradient(135deg, #0a0c10, #151820)",
    "linear-gradient(135deg, #0c0f16, #1d1f25)",
    "linear-gradient(135deg, #080808, #101010)",
    "linear-gradient(135deg, #0b0b12, #15151d)"
];

const colors = ["#00f7ff", "#ff00ea", "#39ff14", "#ffd33d", "#ff4d4d"];
const shapes = ["circle", "heart", "star"];

setInterval(() => createShape(), 250);
setInterval(() => changeBackground(), 2500);

function createShape() {
    let shape = document.createElement("span");

    shape.style.color = colors[Math.floor(Math.random() * colors.length)];
    shape.className = shapes[Math.floor(Math.random() * shapes.length)];

    shape.style.left = Math.random() * window.innerWidth + "px";
    shape.style.top = window.innerHeight + "px";

    box.appendChild(shape);

    setTimeout(() => shape.remove(), 2500);
}

function changeBackground() {
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];
    document.body.style.background = gradient;
}