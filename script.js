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
    card.className = "group cursor-pointer";
    card.dataset.title = p.title.toLowerCase();

    card.innerHTML = `
      <div class="relative h-full bg-white/5 backdrop-blur-lg border border-purple-400/20 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/30">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
        
        <div class="relative z-10 flex flex-col h-full">
          <div class="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            <i class="fa-solid ${p.icon} text-purple-400"></i>
          </div>
          <h4 class="text-xl font-bold text-white mb-2">${p.title}</h4>
          ${p.desc ? `<p class="text-gray-400 text-sm mb-4 flex-grow">${p.desc}</p>` : '<div class="flex-grow"></div>'}
          <div class="flex gap-3 mt-auto">
            <button class="live-btn flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
              Live
            </button>
            <button class="code-btn flex-1 px-4 py-2 border-2 border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-300">
              Code
            </button>
          </div>
        </div>
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
  const cards = document.querySelectorAll("[data-title]");

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

/* Initialize on page load */
document.addEventListener("DOMContentLoaded", () => {
  // Trigger search to ensure cards are visible
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.value = "";
    searchProjects();
  }

  // Typing animation
  const texts = [
    "Frontend Developer",
    "Creative Coder",
    "Web Designer",
    "Problem Solver",
    "UI/UX Enthusiast"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector(".typing-text");

  if (typingElement) {
    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 80 : 150;

      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2500; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 800;
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing animation after header animations
    setTimeout(type, 1200);
  }
});
