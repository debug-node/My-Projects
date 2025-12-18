function drag() {

    let dragging = null;
    let startX, startY;
    let eleX, eleY;

    const boxes = document.querySelectorAll("[draggable]");

    boxes.forEach(box => {
        box.addEventListener("mousedown", startDrag);
        box.addEventListener("touchstart", startDrag, { passive: false });

        box.style.position = "relative";
        box.style.left = "0px";
        box.style.top = "0px";
    });

    function startDrag(e) {
        e.preventDefault();

        dragging = this;

        const point = e.touches ? e.touches[0] : e;

        startX = point.pageX;
        startY = point.pageY;

        eleX = parseInt(dragging.style.left) || 0;
        eleY = parseInt(dragging.style.top) || 0;

        document.addEventListener("mousemove", moveDrag);
        document.addEventListener("touchmove", moveDrag, { passive: false });

        document.addEventListener("mouseup", endDrag);
        document.addEventListener("touchend", endDrag);
    }

    function moveDrag(e) {
        if (!dragging) return;

        e.preventDefault();
        const point = e.touches ? e.touches[0] : e;

        const dx = point.pageX - startX;
        const dy = point.pageY - startY;

        dragging.style.left = eleX + dx + "px";
        dragging.style.top = eleY + dy + "px";
    }

    function endDrag() {
        dragging = null;

        document.removeEventListener("mousemove", moveDrag);
        document.removeEventListener("touchmove", moveDrag);

        document.removeEventListener("mouseup", endDrag);
        document.removeEventListener("touchend", endDrag);
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
