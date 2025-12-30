/* Navigation */
function go(path) {
  window.location.href = path;
}

/* Open GitHub code */
function openCode(url) {
  window.open(url, "_blank");
}

/* Render projects (used in project pages) */
function renderProjects(list) {
  const container = document.getElementById("projects");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.title = p.title.toLowerCase();

    card.innerHTML = `
      <i class="fa-solid ${p.icon} icon"></i>
      <h4>${p.title}</h4>
      <div class="card-btns">
        <button class="live-btn">Live</button>
        <button class="code-btn">Code</button>
      </div>
    `;

    // Use event listeners instead of onclick
    card.querySelector(".live-btn").addEventListener("click", () => go(p.live));
    card.querySelector(".code-btn").addEventListener("click", () => openCode(p.code));

    container.appendChild(card);
  });
}

/* Search (Home page categories) */
function searchProjects() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return; // Safety check

  const input = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.dataset.title || card.innerText.toLowerCase();
    card.style.display = title.includes(input) ? "" : "none"; // Use empty string for default display
  });
}

const headings = document.querySelectorAll("h2");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  { threshold: 0.6 }
);

headings.forEach(h => observer.observe(h));