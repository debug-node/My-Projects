// ===== DOM Elements =====
const addNoteBtn = document.getElementById("add-note");
const modalOverlay = document.getElementById("modalOverlay");
const formContainer = document.getElementById("formContainer");
const closeFormBtn = document.getElementById("closeForm");
const stack = document.getElementById("stack");
const emptyState = document.getElementById("emptyState");
const cardCounter = document.getElementById("cardCounter");
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const form = document.getElementById("callForm");
const themeToggle = document.getElementById("themeToggle");

// ===== Constants =====
const ANIM_DURATION = 420;
const ANIM_EASING = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
const CATEGORY_MAP = {
  Emergency: { css: "emergency", icon: "ri-alarm-warning-line" },
  Important: { css: "important", icon: "ri-star-line" },
  Urgent: { css: "urgent", icon: "ri-timer-flash-line" },
  "No Rush": { css: "no-rush", icon: "ri-time-line" },
};

// Reusable element for XSS sanitization
const _escDiv = document.createElement("div");
const escapeHTML = (str) => {
  _escDiv.textContent = str;
  return _escDiv.innerHTML;
};

// ===== Theme =====
const applyTheme = (theme) => {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.innerHTML = `<i class="ri-${theme === "dark" ? "sun" : "moon"}-line"></i>`;
};

applyTheme(localStorage.getItem("theme") || "light");

themeToggle.addEventListener("click", () => {
  const theme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

// ===== Storage =====
const getTasks = () => {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch {
    return [];
  }
};
const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

// ===== Modal =====
const openModal = () => {
  modalOverlay.classList.add("active");
  setTimeout(() => form.elements.imageUrl.focus(), 350);
};
const closeModal = () => {
  modalOverlay.classList.remove("active");
  form.reset();
};

addNoteBtn.addEventListener("click", openModal);
closeFormBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ===== Form Submit =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imageUrl = form.elements.imageUrl.value.trim();
  const fullName = form.elements.fullName.value.trim();
  const homeTown = form.elements.homeTown.value.trim();
  const purpose = form.elements.purpose.value.trim();
  const category = form.querySelector("input[name='category']:checked")?.value;

  if (!imageUrl || !fullName || !homeTown || !purpose || !category) {
    formContainer.style.animation = "none";
    void formContainer.offsetHeight;
    formContainer.style.animation = "shake 0.4s ease";
    return;
  }

  const task = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    imageUrl,
    fullName,
    homeTown,
    purpose,
    category,
    createdAt: new Date().toISOString(),
  };

  const tasks = getTasks();
  tasks.unshift(task);
  saveTasks(tasks);
  closeModal();
  renderCards();
});

// ===== Card Rendering =====
function renderCards() {
  stack.querySelectorAll(".card").forEach((c) => c.remove());
  const tasks = getTasks();

  if (tasks.length === 0) {
    emptyState.classList.remove("hidden");
    cardCounter.textContent = "";
  } else {
    emptyState.classList.add("hidden");
    cardCounter.textContent = `${tasks.length} contact${tasks.length !== 1 ? "s" : ""}`;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = task.id;

    const safe = {
      name: escapeHTML(task.fullName),
      town: escapeHTML(task.homeTown),
      purpose: escapeHTML(task.purpose),
      category: escapeHTML(task.category),
      url: escapeHTML(task.imageUrl),
    };
    const cat = CATEGORY_MAP[task.category] || {
      css: "",
      icon: "ri-price-tag-3-line",
    };

    card.innerHTML = `
      <div class="card-top">
        <img class="avatar" src="${safe.url}" alt="${safe.name}" />
        <div>
          <h2>${safe.name}</h2>
          <span class="category-badge ${cat.css}">
            <i class="${cat.icon}"></i> ${safe.category}
          </span>
        </div>
      </div>
      <div class="info-row">
        <span class="info-label">Home Town</span>
        <span class="info-value">${safe.town}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Purpose</span>
        <span class="info-value">${safe.purpose}</span>
      </div>
      <div class="buttons">
        <button class="btn btn-call"><i class="ri-phone-line"></i> Call</button>
        <button class="btn btn-msg">Message</button>
        <button class="btn btn-delete" aria-label="Delete"><i class="ri-delete-bin-6-line"></i></button>
      </div>
    `;

    // Fallback image (self-removing listener)
    const img = card.querySelector("img");
    img.addEventListener("error", function onErr() {
      this.src =
        "https://placehold.co/80x80/09090b/ffffff?text=" +
        encodeURIComponent(task.fullName.charAt(0).toUpperCase());
      this.removeEventListener("error", onErr);
    });

    // Delete with animation
    card.querySelector(".btn-delete").addEventListener("click", () => {
      saveTasks(getTasks().filter((t) => t.id !== task.id));
      card.style.opacity = "0";
      card.style.transform = "translateX(60px) scale(0.9)";
      setTimeout(renderCards, 350);
    });

    stack.appendChild(card);
  });

  updateStack();
}

// ===== Stack Positioning Helper =====
function updateStack(skipA, skipB) {
  const cards = stack.querySelectorAll(".card");
  let pos = skipA || skipB ? 1 : 0;
  cards.forEach((card) => {
    if (card === skipA || card === skipB) return;
    if (pos < 3) {
      card.style.zIndex = String(cards.length - pos);
      card.style.transform = `translateY(${pos * 14}px) scale(${1 - pos * 0.04})`;
      card.style.opacity = String(1 - pos * 0.2);
      card.style.pointerEvents = pos === 0 ? "auto" : "none";
    } else {
      card.style.zIndex = "0";
      card.style.transform = "translateY(42px) scale(0.88)";
      card.style.opacity = "0";
      card.style.pointerEvents = "none";
    }
    pos++;
  });
}

// ===== Navigation =====
let isAnimating = false;

// CLOCKWISE — everything moves UPWARD
function navigateUp() {
  const cards = stack.querySelectorAll(".card");
  if (cards.length < 2 || isAnimating) return;
  isAnimating = true;

  const topCard = cards[0];
  const last = cards[cards.length - 1];

  // Top card exits upward
  topCard.style.transition = ANIM_EASING;
  topCard.style.transform = "translateY(-70px) scale(0.9)";
  topCard.style.opacity = "0";
  topCard.style.pointerEvents = "none";

  // Bring last card to front, position below
  stack.insertBefore(last, topCard);
  last.style.transition = "none";
  last.style.opacity = "0";
  last.style.transform = "translateY(50px) scale(0.9)";
  last.style.zIndex = String(cards.length + 1);
  last.style.pointerEvents = "none";
  void last.offsetHeight;

  // Slide new top card upward into place
  last.style.transition = ANIM_EASING;
  last.style.opacity = "1";
  last.style.transform = "translateY(0) scale(1)";

  updateStack(last, topCard);

  setTimeout(() => {
    topCard.style.transition = "none";
    void topCard.offsetHeight;
    updateStack();
    void topCard.offsetHeight;
    topCard.style.transition = "";
    isAnimating = false;
  }, ANIM_DURATION);
}

// ANTICLOCKWISE — everything moves DOWNWARD
function navigateDown() {
  const cards = stack.querySelectorAll(".card");
  if (cards.length < 2 || isAnimating) return;
  isAnimating = true;

  const topCard = cards[0];
  const second = cards[1];

  // Top card exits downward
  topCard.style.transition = ANIM_EASING;
  topCard.style.transform = "translateY(70px) scale(0.9)";
  topCard.style.opacity = "0";
  topCard.style.pointerEvents = "none";

  // Next card: position above, then slide down into place
  if (second) {
    second.style.transition = "none";
    second.style.transform = "translateY(-30px) scale(0.95)";
    second.style.opacity = "0.5";
    void second.offsetHeight;

    second.style.transition = ANIM_EASING;
    second.style.transform = "translateY(0) scale(1)";
    second.style.opacity = "1";
    second.style.zIndex = String(cards.length);
    second.style.pointerEvents = "auto";
  }

  updateStack(topCard, second);

  setTimeout(() => {
    topCard.style.transition = "none";
    stack.appendChild(topCard);
    void topCard.offsetHeight;
    topCard.style.transition = "";
    updateStack();
    isAnimating = false;
  }, ANIM_DURATION);
}

upBtn.addEventListener("click", navigateUp);
downBtn.addEventListener("click", navigateDown);

// ===== Keyboard Shortcuts =====
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    if (e.key === "Escape") closeModal();
    return;
  }
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      navigateUp();
      break;
    case "ArrowDown":
      e.preventDefault();
      navigateDown();
      break;
    case "Escape":
      closeModal();
      break;
    case "n":
    case "N":
      if (!modalOverlay.classList.contains("active")) openModal();
      break;
  }
});

// ===== Init =====
renderCards();
