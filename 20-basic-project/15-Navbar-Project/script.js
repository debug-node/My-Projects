const toggleBtn = document.querySelector(".toggleBtn");
const links = document.querySelector(".links");

if (toggleBtn && links) {
    toggleBtn.addEventListener("click", () => {
        const isActive = links.classList.toggle("active");
        toggleBtn.classList.toggle("open");

        toggleBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
}