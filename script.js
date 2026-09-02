function go(path) {
  window.location.href = path;
}

function initSplashLoader() {
  const targetHeading = document.querySelector("header h1, .category-header h1");
  if (!targetHeading) return;

  // Temporarily disable scroll and pointer events during animation
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";

  // Hide target heading visually but keep layout
  targetHeading.style.opacity = "0";

  // Prepare and gather rest of the elements for a premium staggered fade-in
  const headerSiblings = Array.from(targetHeading.parentElement.children).filter(child => child !== targetHeading);
  
  const flex1 = document.querySelector(".flex-1");
  const contentChildren = flex1 ? Array.from(flex1.children).filter(child => child.tagName !== "HEADER") : [];
  
  const footer = document.querySelector("footer");

  // Immediately hide them so they don't flash on initial load
  headerSiblings.forEach(el => el.classList.add("stagger-prepare"));
  contentChildren.forEach(el => el.classList.add("stagger-prepare"));
  if (footer) footer.classList.add("stagger-prepare");

  // Create the loader overlay
  const loader = document.createElement("div");
  loader.id = "splash-loader";
  loader.className = "fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]";
  
  // Create logo container with glow effect
  loader.innerHTML = `
    <div class="splash-logo-shadow-glow"></div>
    <div id="splash-logo-container" class="splash-logo-animate splash-loader-text">
      <!-- Cloned heading will go here -->
    </div>
  `;
  
  const container = loader.querySelector("#splash-logo-container");
  
  // Clone heading structure and append to container
  const headingClone = targetHeading.cloneNode(true);
  headingClone.id = "splash-heading-clone";
  headingClone.removeAttribute("id");
  
  // Clean up fonts/alignment to center it nicely
  headingClone.className = targetHeading.className;
  headingClone.classList.remove("mb-6", "mb-8");
  headingClone.style.opacity = "1";
  
  container.appendChild(headingClone);
  document.body.appendChild(loader);

  // Animate and transition
  setTimeout(() => {
    const targetRect = targetHeading.getBoundingClientRect();
    const cloneRect = headingClone.getBoundingClientRect();

    if (cloneRect.width === 0 || targetRect.width === 0) {
      // Fallback: fade out loader if heights are not set yet
      loader.style.transition = "opacity 1s ease";
      loader.style.opacity = "0";
      setTimeout(() => {
        targetHeading.style.opacity = "1";
        headerSiblings.forEach(el => el.classList.remove("stagger-prepare"));
        contentChildren.forEach(el => el.classList.remove("stagger-prepare"));
        if (footer) footer.classList.remove("stagger-prepare");
        document.body.style.overflow = "";
        document.body.style.pointerEvents = "";
        loader.remove();
      }, 1000);
      return;
    }

    // Compute center-to-center delta
    const cloneCenterX = cloneRect.left + cloneRect.width / 2;
    const cloneCenterY = cloneRect.top + cloneRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const deltaX = targetCenterX - cloneCenterX;
    const deltaY = targetCenterY - cloneCenterY;

    // Compute scale difference
    const scale = targetRect.width / cloneRect.width;

    // 1. Clear the entrance CSS animation so it doesn't block inline styles
    container.classList.remove("splash-logo-animate");
    container.style.animation = "none";
    
    // Force reflow so the browser registers animation removal
    void container.offsetWidth;

    // 2. Set slow, smooth transition for the slide (1.8 seconds)
    container.style.transition = "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
    container.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;

    // 3. Fade out the splash background slowly
    loader.style.transition = "background-color 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
    loader.style.backgroundColor = "transparent";
    loader.style.pointerEvents = "none";

    // 4. Stagger the entry of the rest of the page content
    // Trigger description/back-button fade-in quickly as the slide begins
    setTimeout(() => {
      headerSiblings.forEach(el => el.classList.add("stagger-fade-in"));
    }, 150);

    // Stagger content containers step-by-step
    contentChildren.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add("stagger-fade-in");
      }, 350 + idx * 200); // 200ms stagger between sections
    });

    // Finally fade in the footer at the very end
    if (footer) {
      setTimeout(() => {
        footer.classList.add("stagger-fade-in");
      }, 400 + contentChildren.length * 200);
    }
    
    // Restore scrolling slightly before the animation ends
    setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }, 1400);

    // 5. Once transition ends, clean up
    setTimeout(() => {
      targetHeading.style.opacity = "1";
      
      // Clean up classes to restore natural layout behavior
      headerSiblings.forEach(el => el.classList.remove("stagger-prepare", "stagger-fade-in"));
      contentChildren.forEach(el => el.classList.remove("stagger-prepare", "stagger-fade-in"));
      if (footer) footer.classList.remove("stagger-prepare", "stagger-fade-in");
      
      loader.remove();
    }, 1850);

  }, 1500); // 1.5 seconds loading time
}


function renderCategories(list) {
  const container = document.getElementById("categories");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(cat => {
    const card = document.createElement("div");
    card.className = "group glowing-card cursor-pointer";
    card.dataset.title = cat.dataTitle;
    card.onclick = () => go(cat.url);

    card.innerHTML = `
      <div class="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 transform transition-all duration-500 hover:scale-[1.04] hover:bg-white/[0.07] hover:border-purple-400/30 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.25)]">
        <div class="absolute inset-0 bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-700"></div>
        
        <div class="relative z-10">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/15 to-blue-500/10 border border-purple-500/10 flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <i class="${cat.icon} ${cat.iconColor} text-2xl"></i>
          </div>
          <h4 class="text-xl font-bold text-white mb-2 tracking-tight">${cat.title}</h4>
          <p class="text-slate-400 text-[13px] leading-relaxed mb-4">${cat.desc}</p>
          <div class="flex items-center text-[11px] text-purple-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span>Explore</span>
            <i class="fa-solid fa-arrow-right ml-2 text-[10px] group-hover:translate-x-1 transition-transform duration-300"></i>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function loadFavoritesOnHome() {
  const section = document.getElementById("favorites-section");
  const grid = document.getElementById("favorites-grid");
  if (!section || !grid) return;

  const favsData = localStorage.getItem("projectverse_favorites");
  const favs = favsData ? JSON.parse(favsData) : [];

  if (favs.length === 0) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");
  grid.innerHTML = "";

  favs.forEach(p => {
    const card = document.createElement("div");
    card.className = "group glowing-card cursor-pointer";
    
    card.innerHTML = `
      <div class="relative h-full bg-white/5 backdrop-blur-lg border border-yellow-400/20 rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/30">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
        
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="text-4xl transform group-hover:scale-110 transition-transform duration-300">
              <i class="fa-solid ${p.icon || 'fa-cube'} text-yellow-400"></i>
            </div>
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">
              Starred
            </span>
          </div>
          <h4 class="text-xl font-bold text-white mb-2">${p.title}</h4>
          ${p.desc ? `<p class="text-gray-400 text-sm mb-4 flex-grow">${p.desc}</p>` : '<div class="flex-grow"></div>'}
          <div class="flex gap-3 mt-auto">
            <button class="live-btn flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
              Play
            </button>
            <a href="${p.code}" target="_blank" rel="noopener noreferrer" class="code-btn flex-1 px-4 py-2 border-2 border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 text-center">
              Code
            </a>
          </div>
        </div>
      </div>
    `;

    const targetUrl = `/pages/${p.category}.html?project=${encodeURIComponent(p.title)}`;
    
    card.querySelector(".live-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      go(targetUrl);
    });
    
    card.addEventListener("click", () => go(targetUrl));

    grid.appendChild(card);
  });
}

function searchProjects() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  const input = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll("[data-title]");

  cards.forEach(card => {
    const title = card.dataset.title || card.innerText.toLowerCase();
    card.style.display = title.includes(input) ? "" : "none";
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

function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = document.body.scrollHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.body.scrollHeight;
  });

  window.addEventListener("scroll", () => {
    const newH = document.body.scrollHeight;
    if (Math.abs(newH - h) > 100) {
      h = canvas.height = newH;
    }
  });

  const mouse = {
    x: null,
    y: null,
    radius: 200,
    isClicked: false
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY + window.scrollY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("mousedown", () => { mouse.isClicked = true; });
  window.addEventListener("mouseup", () => { mouse.isClicked = false; });

  const colors = [
    "rgba(168, 85, 247, 0.6)",   // purple
    "rgba(139, 92, 246, 0.5)",   // violet
    "rgba(99, 102, 241, 0.45)",  // indigo
    "rgba(236, 72, 153, 0.4)",   // pink
    "rgba(59, 130, 246, 0.4)",   // blue
  ];

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2.5 + 1.2;
      this.baseSize = this.size;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > w || this.x < 0) this.speedX = -this.speedX;
      if (this.y > h || this.y < 0) this.speedY = -this.speedY;

      if (mouse.x != null && mouse.y != null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;

          if (mouse.isClicked) {

            this.x += directionX * force * 8;
            this.y += directionY * force * 8;
          } else {

            this.x += directionX * force * 2.5;
            this.y += directionY * force * 2.5;
          }

          this.size = this.baseSize + force * 3;
        } else {

          if (this.size > this.baseSize) {
            this.size -= 0.1;
          }
        }
      }
    }
    draw() {

      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function init() {
    particlesArray = [];
    const numberOfParticles = Math.floor((w * h) / 8000);
    for (let i = 0; i < Math.min(numberOfParticles, 300); i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.hypot(dx, dy);

        if (distance < 140) {
          const opacityValue = 1 - distance / 140;

          let lineOpacity = opacityValue * 0.15;
          if (mouse.x != null && mouse.y != null) {
            const midX = (particlesArray[a].x + particlesArray[b].x) / 2;
            const midY = (particlesArray[a].y + particlesArray[b].y) / 2;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            if (mouseDist < mouse.radius * 1.5) {
              lineOpacity = opacityValue * 0.35;
            }
          }

          ctx.strokeStyle = `rgba(168, 85, 247, ${lineOpacity})`;
          ctx.lineWidth = opacityValue * 1.2;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  init();
  animate();
}

let allProjectsCached = [];

async function cacheAllProjects() {
  const categoryFiles = [
    { key: "mini-projects", name: "Mini Projects" },
    { key: "beginner-projects", name: "Beginner Projects" },
    { key: "html-css-projects", name: "UI/UX Designs" },
    { key: "js-projects", name: "Logic Apps" }
  ];

  for (const file of categoryFiles) {
    try {
      const res = await fetch(`/data/${file.key}.json`);
      const list = await res.json();
      list.forEach(p => {
        allProjectsCached.push({
          ...p,
          category: file.key,
          categoryName: file.name
        });
      });
    } catch (e) {
      console.warn(`Failed to fetch data for category: ${file.key}`, e);
    }
  }
}

window.handleGlobalSearch = function() {

  searchProjects();

  const searchInput = document.getElementById("search");
  const resultsContainer = document.getElementById("search-results");
  if (!searchInput || !resultsContainer) return;

  const query = searchInput.value.trim().toLowerCase();

  if (query.length === 0) {
    resultsContainer.classList.add("hidden");
    resultsContainer.innerHTML = "";
    return;
  }

  const matches = allProjectsCached.filter(p => 
    p.title.toLowerCase().includes(query) || 
    (p.desc && p.desc.toLowerCase().includes(query))
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-400">
        <i class="fa-solid fa-circle-exclamation text-slate-500 text-lg mb-2 block"></i>
        No matching projects found. Try another keyword!
      </div>
    `;
    resultsContainer.classList.remove("hidden");
    return;
  }

  resultsContainer.innerHTML = matches.map(p => `
    <div onclick="go('/pages/${p.category}.html?project=${encodeURIComponent(p.title)}')" 
         class="flex items-center gap-3.5 p-3 rounded-xl hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20 cursor-pointer transition-all duration-300 group">
      <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
        <i class="fa-solid ${p.icon || 'fa-cube'} text-base"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-center mb-0.5">
          <h4 class="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">${p.title}</h4>
          <span class="text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 shrink-0 ml-2">${p.categoryName}</span>
        </div>
        <p class="text-[11px] text-slate-400 truncate">${p.desc || 'Interactive playroom project workspace'}</p>
      </div>
    </div>
  `).join("");

  resultsContainer.classList.remove("hidden");
};

document.addEventListener("click", (e) => {
  const searchInput = document.getElementById("search");
  const resultsContainer = document.getElementById("search-results");
  if (searchInput && resultsContainer) {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.classList.add("hidden");
    }
  }
});

function initGlowTracker() {
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".glowing-card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-target]");
  
  const countUp = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    
    const speed = target > 100 ? 80 : 30;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => countUp(counter), 25);
    } else {
      counter.innerText = target;
    }
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        counter.innerText = "0";
        countUp(counter);
        statsObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.8 });

  counters.forEach(c => statsObserver.observe(c));
}

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize the premium splash screen first
  initSplashLoader();

  initParticles();
  initGlowTracker();

  const categoriesContainer = document.getElementById("categories");
  if (categoriesContainer) {
    loadFavoritesOnHome();
    

    await cacheAllProjects();

    const projectsCountEl = document.getElementById("stat-projects-count");
    if (projectsCountEl) {
      projectsCountEl.setAttribute("data-target", allProjectsCached.length);
    }

    // Delay counter animation until after the splash finishes
    setTimeout(animateCounters, 3000);

    try {
      const res = await fetch('/data/categories.json');
      const categories = await res.json();
      renderCategories(categories);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.value = "";
    searchProjects();
  }

  const texts = [
    "50+ Interactive Web Apps",
    "Pure HTML, CSS & JavaScript",
    "Sleek & Modern UI Playgrounds",
    "Instant Live Previews & Code",
    "Open-Source Developer Hub"
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
        typingSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 800;
      }

      setTimeout(type, typingSpeed);
    }

    // Delay typing animation until the splash screen is fully finished
    setTimeout(type, 3400);
  }
});