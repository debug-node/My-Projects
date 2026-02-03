const A = document.getElementById("first")
const d = document.getElementById("d")
const i = document.getElementById("i")
const t = document.getElementById("t")
const y = document.getElementById("y")
const a = document.getElementById("a")
const aditya = document.getElementById("complete")

A.addEventListener("click", () => {
    A.style.display = "none";
    d.style.display = "block";
});

d.addEventListener("click", () => {
    d.style.display = "none";
    i.style.display = "block";
});

i.addEventListener("click", () => {
    i.style.display = "none";
    t.style.display = "block";
});

t.addEventListener("click", () => {
    t.style.display = "none";
    y.style.display = "block";
});

y.addEventListener("click", () => {
    y.style.display = "none";
    a.style.display = "block";
});

a.addEventListener("click", () => {
    a.style.display = "none";
    aditya.style.display = "block";
});

aditya.addEventListener("click", () => {
    aditya.style.display = "none";
    A.style.display = "block";
});

/* Reveal & Reset Buttons (Reveal shows only the next letter) */
const revealBtn = document.getElementById("reveal");
const resetBtn = document.getElementById("reset");

const seq = [A, d, i, t, y, a, aditya];

revealBtn.addEventListener("click", () => {
    let idx = seq.findIndex(el => window.getComputedStyle(el).display !== "none");
    if (idx === -1) idx = 0;
    if (idx < seq.length - 1) {
        seq[idx].click();
    }
});

resetBtn.addEventListener("click", () => {
    seq.forEach(el => el.style.display = "none");
    A.style.display = "block";
});