const timeline = document.getElementById("timeline");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let step = 1;

// Function to update timeline and UI
function updateTimeline() {
    circles.forEach((circle, index) => {
        // Activate up to current step
        if (index < step) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }

        // 🟢 Remove any previous size classes
        circle.classList.remove("size-1", "size-2", "size-3", "size-4", "size-5");
    });

    // 🟢 Apply size class based on step number
    circles.forEach((circle, index) => {
        if (index < step) {
            circle.classList.add(`size-${index + 1}`);
        }
    });

    // 🟡 Update timeline width (same as before)
    const actives = document.querySelectorAll(".active");
    timeline.style.width = `${((actives.length - 1) / (circles.length - 1)) * 100}%`;

    // 🟠 Disable/enable buttons
    prev.disabled = step === 1;
    next.disabled = step === circles.length;
}

// Next Button
next.addEventListener("click", () => {
    step++;
    if (step > circles.length) step = circles.length;
    updateTimeline();
});

// Previous Button
prev.addEventListener("click", () => {
    step--;
    if (step < 1) step = 1;
    updateTimeline();
});