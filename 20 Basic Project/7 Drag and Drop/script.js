function drag() {

    let dragging = false;
    let mouseX, mouseY;
    let eleX, eleY;

    const boxes = document.querySelectorAll("[draggable]");

    boxes.forEach(box => {
        box.addEventListener('mousedown', mouseDown);
        box.style.top = 0;
        box.style.left = 0;
    });

    function mouseDown(e) {
        e.preventDefault();

        dragging = this;

        mouseX = e.pageX;
        mouseY = e.pageY;

        eleX = Number.parseInt(dragging.style.left);
        eleY = Number.parseInt(dragging.style.top);

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }

    function mouseMove(e) {
        if (dragging) {
            const deltaMouseX = e.pageX - mouseX;
            const deltaMouseY = e.pageY - mouseY;

            dragging.style.left = deltaMouseX + eleX + "px";
            dragging.style.top = deltaMouseY + eleY + "px";

        }
    }

    function mouseUp(e) {
        dragging = false;
    }

}

drag();

// ---------------------------
// RESET BUTTON FUNCTIONALITY
// ---------------------------
const resetBtn = document.getElementById("resetBtn");
const allBoxes = document.querySelectorAll(".box");

// Save initial positions (0,0) when page loads
allBoxes.forEach(box => {
    if (!box.style.left) box.style.left = "0px";
    if (!box.style.top) box.style.top = "0px";
});

// Reset positions on click
resetBtn.addEventListener("click", () => {
    allBoxes.forEach(box => {
        box.style.left = "0px";
        box.style.top = "0px";
        box.style.transform = "";  // remove any drag transform
    });
});
