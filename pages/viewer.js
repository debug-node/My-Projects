let activeProject = null;
let isSidebarOpen = true;
let viewerResizeHandler = null;

function updateSidebarState() {
  const sidebar = document.getElementById("inline-sidebar");
  const toggleBtn = document.getElementById("toggle-sidebar-btn");
  const backdrop = document.getElementById("sidebar-backdrop");
  if (!sidebar) return;

  const isMobile = window.innerWidth < 768;

  sidebar.classList.toggle("collapsed", !isSidebarOpen);

  if (backdrop) {
    if (isSidebarOpen && isMobile) {
      backdrop.classList.remove("hidden");
      backdrop.offsetHeight;
      backdrop.classList.add("active");
    } else {
      backdrop.classList.remove("active");
      setTimeout(() => {

        if ((!isSidebarOpen || !isMobile) && backdrop) {
          backdrop.classList.add("hidden");
        }
      }, 300);
    }
  }

  if (toggleBtn) {
    toggleBtn.classList.toggle("text-purple-400", isSidebarOpen);
    toggleBtn.classList.toggle("text-slate-400", !isSidebarOpen);
  }
}

function renderProjects(list, categoryKey) {
  const container = document.getElementById("projects");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "group cursor-pointer";
    card.dataset.title = p.title.toLowerCase();

    card.innerHTML = `
      <div class="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 transform transition-all duration-500 hover:scale-[1.03] hover:bg-white/[0.07] hover:border-purple-400/30 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.25)]">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/[0.08] via-transparent to-blue-500/[0.05] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-700"></div>
        
        <div class="relative z-10 flex flex-col h-full">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/10 flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <i class="fa-solid ${p.icon || 'fa-cube'} text-purple-400 text-xl"></i>
          </div>
          <h4 class="text-lg font-bold text-white mb-1.5 tracking-tight">${p.title}</h4>
          ${p.desc ? `<p class="text-slate-400 text-[13px] leading-relaxed mb-4 flex-grow">${p.desc}</p>` : '<div class="flex-grow"></div>'}
          <div class="flex gap-2.5 mt-auto">
            <button class="live-btn flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[13px] font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 hover:brightness-110 transition-all duration-300 uppercase tracking-wider">
              ▶ Play
            </button>
            <a href="${p.code}" target="_blank" rel="noopener noreferrer" class="code-btn flex-1 px-4 py-2.5 border border-purple-500/25 text-purple-300 text-[13px] font-bold rounded-xl hover:bg-purple-500/15 hover:border-purple-400/50 hover:text-white transition-all duration-300 text-center uppercase tracking-wider">
              &lt;/&gt; Code
            </a>
          </div>
        </div>
      </div>
    `;

    card.querySelector(".live-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openInlineProject(p, list, categoryKey);
    });

    card.addEventListener("click", () => {
      openInlineProject(p, list, categoryKey);
    });

    container.appendChild(card);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const targetProj = urlParams.get('project');
  if (targetProj) {
    const decoded = decodeURIComponent(targetProj).toLowerCase();
    const match = list.find(p => p.title.toLowerCase() === decoded);
    if (match) {
      setTimeout(() => openInlineProject(match, list, categoryKey), 100);
    }
  }
}

function openInlineProject(p, list, categoryKey) {
  activeProject = p;
  const grid = document.getElementById("projects");
  const viewer = document.getElementById("project-viewer");
  const searchBar = document.getElementById("search");

  if (!grid || !viewer) return;

  grid.parentElement.classList.add("hidden");
  if (searchBar) {
    searchBar.parentElement.classList.add("hidden");
  }

  document.body.classList.add("overflow-y-hidden");
  const footer = document.querySelector("footer");
  if (footer) {
    footer.classList.remove("mt-16");
    footer.classList.add("mt-4");
  }
  window.scrollTo(0, 0);

  viewer.classList.remove("hidden");
  viewer.classList.remove("pb-20");
  viewer.classList.add("pb-2");

  const newUrl = `${window.location.pathname}?project=${encodeURIComponent(p.title)}`;
  window.history.pushState({ path: newUrl }, "", newUrl);

  const isFav = isProjectFavorite(p, categoryKey);

  const realUrl = window.location.origin + p.live;

  viewer.innerHTML = `
    <!-- Top toolbar controls centered with site grids -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 mb-3">
      <div class="flex items-center justify-between gap-1.5 sm:gap-4 pb-2 border-b border-purple-500/20 w-full overflow-hidden">
               <!-- Navigation Buttons and Project Info -->
        <div class="flex items-center gap-1.5 sm:gap-4 min-w-0 sm:flex-1">
          <!-- Back to grid button -->
          <button id="close-viewer-btn" class="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/20 text-purple-300 transition-all text-xs font-semibold shrink-0" title="Go Back to Project Grid">
            <i class="fa-solid fa-chevron-left text-[10px] sm:text-xs"></i>
            <span class="hidden sm:inline">Back to Grid</span>
          </button>

          <!-- Toggle Sidebar menu button -->
          <button id="toggle-sidebar-btn" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/15 text-purple-400 flex items-center justify-center transition-all shrink-0" title="Toggle Projects Sidebar">
            <i class="fa-solid fa-bars text-xs sm:text-sm"></i>
          </button>

          <!-- Icon & Title -->
          <div class="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
              <i id="inline-project-icon" class="fa-solid ${p.icon || 'fa-cube'} text-xs sm:text-sm"></i>
            </div>
            <h3 id="inline-project-title" class="text-xs sm:text-base md:text-lg font-bold text-white leading-none truncate">${p.title}</h3>
          </div>
        </div>

        <!-- Device Preview Toggle -->
        <div class="hidden md:flex items-center justify-center gap-2 md:flex-1 shrink-0">
          <div class="flex items-center gap-2 bg-purple-950/60 p-1 border border-purple-500/15 rounded-xl px-2">
            <button onclick="setInlineDevice('mobile')" id="btn-inline-mobile" class="w-7 h-7 rounded-lg text-purple-300/40 hover:text-white hover:bg-purple-500/10 flex items-center justify-center transition-all" title="Mobile View (375px)">
              <i class="fa-solid fa-mobile-screen-button text-xs"></i>
            </button>
            <button onclick="setInlineDevice('tablet')" id="btn-inline-tablet" class="w-7 h-7 rounded-lg text-purple-300/40 hover:text-white hover:bg-purple-500/10 flex items-center justify-center transition-all" title="Tablet View (768px)">
              <i class="fa-solid fa-tablet-screen-button text-xs"></i>
            </button>
            <button onclick="setInlineDevice('desktop')" id="btn-inline-desktop" class="w-7 h-7 rounded-lg text-purple-400 bg-purple-500/10 flex items-center justify-center transition-all" title="Desktop View (Full Width)">
              <i class="fa-solid fa-desktop text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Action items -->
        <div class="flex items-center gap-1 sm:gap-3.5 shrink-0 sm:flex-1 sm:justify-end">
          <button id="inline-star-btn" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/15 text-purple-300/50 hover:text-yellow-400 flex items-center justify-center transition-all" title="${isFav ? 'Remove from Favorites' : 'Add to Favorites'}">
            <i id="inline-star-icon" class="${isFav ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star text-purple-300/40'} text-[10px] sm:text-xs"></i>
          </button>
          <button id="inline-copy-btn" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/15 text-purple-300/50 hover:text-white flex items-center justify-center transition-all" title="Copy Share Link">
            <i class="fa-regular fa-copy text-[10px] sm:text-xs"></i>
          </button>
          <a id="inline-code-btn" href="${p.code}" target="_blank" rel="noopener noreferrer" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/15 text-purple-300/50 hover:text-white flex items-center justify-center transition-all" title="View Source Code">
            <i class="fa-solid fa-code text-[10px] sm:text-xs"></i>
          </a>
          <a id="inline-live-btn" href="${p.live}" target="_blank" rel="noopener noreferrer" class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/15 text-purple-300/50 hover:text-white flex items-center justify-center transition-all" title="Open in Full Screen">
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] sm:text-xs"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Split-screen Workspace wrapper (with sidebar and iframe viewport) -->
    <div id="inline-viewport-wrapper" class="relative w-full h-[calc(100vh-240px)] min-h-[350px] border-y border-purple-500/15 bg-[#0c0a1a] flex overflow-hidden">
      
      <!-- Backdrop for mobile drawer -->
      <div id="sidebar-backdrop" class="hidden absolute inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300 opacity-0"></div>

      <!-- Left sidebar listing all category projects -->
      <div id="inline-sidebar" class="absolute md:relative left-0 top-0 h-full z-30 w-72 border-r border-purple-500/15 bg-[#110e20]/95 md:bg-[#110e20]/90 backdrop-blur-md shrink-0 flex flex-col transition-all duration-300 overflow-hidden">
        <!-- Search bar inside sidebar list -->
        <div class="p-3 border-b border-purple-500/15">
          <input type="text" id="sidebar-search" placeholder="🔍 Search sidebar..." class="w-full px-3 py-1.5 bg-white/[0.04] border border-purple-500/15 rounded-lg text-[10px] text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20" />
        </div>
        <!-- Projects vertical list items -->
        <div id="sidebar-list" class="flex-1 overflow-y-auto p-2 space-y-1">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Right side preview content -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#0e0b1e]">
        <!-- Live Address bar showing the real link -->
        <div class="w-full h-7 bg-[#110e20] border-b border-purple-500/10 px-4 flex items-center justify-between text-[10px] text-purple-300/50 shrink-0 select-none">
          <div class="flex items-center gap-1.5 truncate">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span id="inline-address-text" class="truncate">${realUrl}</span>
          </div>
          <span id="inline-device-label" class="hidden sm:block text-[8px] text-purple-400/40 uppercase tracking-wider font-semibold">Desktop</span>
        </div>

        <!-- Content viewport -->
        <div class="flex-1 w-full relative bg-[#0e0b1e] flex justify-center overflow-hidden">
          <!-- Spinner loader -->
          <div id="inline-loader" class="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0a1a]/95 z-10">
            <div class="w-10 h-10 border-4 border-purple-900/50 border-l-purple-500 rounded-full animate-spin mb-3"></div>
            <p class="text-xs text-purple-300/40">Loading live workspace...</p>
          </div>
          <iframe id="inline-iframe" src="${p.live}" class="w-full h-full border-none bg-[#0e0b1e] transition-all duration-300" sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms"></iframe>
        </div>
      </div>

    </div>

    <!-- Copied Toast inside category page -->
    <div id="inline-toast" class="fixed bottom-6 right-6 bg-[#110e20] border border-purple-500/25 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 transform translate-y-24 opacity-0 transition-all duration-300 z-50">
      <i class="fa-solid fa-circle-check text-emerald-400"></i>
      <span id="inline-toast-message">Link copied!</span>
    </div>
  `;

  document.getElementById("close-viewer-btn").addEventListener("click", () => {
    closeInlineViewer(searchBar);
  });

  renderSidebarList(list, p, categoryKey);

  const sidebar = document.getElementById("inline-sidebar");
  const toggleBtn = document.getElementById("toggle-sidebar-btn");
  const backdrop = document.getElementById("sidebar-backdrop");

  if (viewerResizeHandler) {
    window.removeEventListener("resize", viewerResizeHandler);
  }

  const checkMobile = () => window.innerWidth < 768;
  let lastIsMobile = checkMobile();
  isSidebarOpen = !lastIsMobile;

  updateSidebarState();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isSidebarOpen = !isSidebarOpen;
      updateSidebarState();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", () => {
      isSidebarOpen = false;
      updateSidebarState();
    });
  }

  viewerResizeHandler = () => {
    const currentIsMobile = checkMobile();
    if (currentIsMobile !== lastIsMobile) {
      lastIsMobile = currentIsMobile;
      isSidebarOpen = !currentIsMobile;
      updateSidebarState();
    }
  };
  window.addEventListener("resize", viewerResizeHandler);

  const sidebarSearch = document.getElementById("sidebar-search");
  if (sidebarSearch) {
    sidebarSearch.addEventListener("input", () => {
      const query = sidebarSearch.value.toLowerCase();
      const items = document.querySelectorAll("#sidebar-list button");
      items.forEach(item => {
        const text = item.querySelector("span").textContent.toLowerCase();
        if (text.includes(query)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  }

  document.getElementById("inline-star-btn").addEventListener("click", () => {
    if (activeProject) {
      toggleInlineFavorite(activeProject, categoryKey);
    }
  });

  document.getElementById("inline-copy-btn").addEventListener("click", () => {
    copyInlineLink();
  });

  const iframeEl = document.getElementById("inline-iframe");
  const loaderEl = document.getElementById("inline-loader");
  iframeEl.addEventListener("load", () => {
    loaderEl.classList.add("hidden");
  });
}

function renderSidebarList(list, currentProj, categoryKey) {
  const container = document.getElementById("sidebar-list");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    const isActive = p.title.toLowerCase() === currentProj.title.toLowerCase();
    const btn = document.createElement("button");
    btn.className = `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-medium transition-all ${isActive
        ? "bg-purple-500/10 border-l-2 border-purple-500 text-purple-300"
        : "text-purple-300/40 hover:text-white hover:bg-purple-500/5"
      }`;

    btn.innerHTML = `
      <i class="fa-solid ${p.icon || 'fa-cube'} ${isActive ? 'text-purple-400' : 'text-purple-400/30'} text-xs shrink-0"></i>
      <span class="truncate">${p.title}</span>
    `;

    btn.addEventListener("click", () => {
      if (isActive) return;
      switchSidebarProject(p, list, categoryKey);
    });

    container.appendChild(btn);
  });
}

function switchSidebarProject(p, list, categoryKey) {
  const iframeEl = document.getElementById("inline-iframe");
  const loaderEl = document.getElementById("inline-loader");
  const titleEl = document.getElementById("inline-project-title");
  const iconEl = document.getElementById("inline-project-icon");
  const addressEl = document.getElementById("inline-address-text");
  const codeBtn = document.getElementById("inline-code-btn");
  const liveBtn = document.getElementById("inline-live-btn");
  const starIcon = document.getElementById("inline-star-icon");
  const starBtn = document.getElementById("inline-star-btn");

  if (!iframeEl || !loaderEl) return;

  loaderEl.classList.remove("hidden");

  iframeEl.src = p.live;

  if (titleEl) titleEl.textContent = p.title;
  if (iconEl) {
    iconEl.className = `fa-solid ${p.icon || 'fa-cube'} text-sm`;
  }
  const realUrl = window.location.origin + p.live;
  if (addressEl) addressEl.textContent = realUrl;

  if (codeBtn) codeBtn.href = p.code;
  if (liveBtn) liveBtn.href = p.live;

  const newUrl = `${window.location.pathname}?project=${encodeURIComponent(p.title)}`;
  window.history.pushState({ path: newUrl }, "", newUrl);

  activeProject = p;

  const isFav = isProjectFavorite(p, categoryKey);
  if (starIcon) {
    starIcon.className = isFav ? "fa-solid fa-star text-yellow-400 text-xs" : "fa-regular fa-star text-slate-400 text-xs";
  }
  if (starBtn) {
    starBtn.title = isFav ? "Remove from Favorites" : "Add to Favorites";
  }

  renderSidebarList(list, p, categoryKey);

  if (window.innerWidth < 768) {
    isSidebarOpen = false;
    updateSidebarState();
  }
}

function closeInlineViewer(searchBar) {
  const grid = document.getElementById("projects");
  const viewer = document.getElementById("project-viewer");
  if (!grid || !viewer) return;

  grid.parentElement.classList.remove("hidden");
  if (searchBar) {
    searchBar.parentElement.classList.remove("hidden");
  }

  viewer.classList.add("hidden");
  viewer.innerHTML = "";
  viewer.classList.remove("pb-2");
  viewer.classList.add("pb-20");

  document.body.classList.remove("overflow-y-hidden");
  const footer = document.querySelector("footer");
  if (footer) {
    footer.classList.remove("mt-4");
    footer.classList.add("mt-16");
  }

  if (viewerResizeHandler) {
    window.removeEventListener("resize", viewerResizeHandler);
    viewerResizeHandler = null;
  }

  window.history.pushState(null, "", window.location.pathname);
  activeProject = null;
}

window.setInlineDevice = function (deviceType) {
  const iframe = document.getElementById("inline-iframe");
  const label = document.getElementById("inline-device-label");
  const btnMobile = document.getElementById("btn-inline-mobile");
  const btnTablet = document.getElementById("btn-inline-tablet");
  const btnDesktop = document.getElementById("btn-inline-desktop");

  if (!iframe) return;

  [btnMobile, btnTablet, btnDesktop].forEach(btn => {
    if (btn) {
      btn.classList.remove("text-purple-400", "bg-purple-500/10");
      btn.classList.add("text-purple-300/40");
    }
  });

  iframe.classList.toggle("device-mobile", deviceType === "mobile");
  iframe.classList.toggle("device-tablet", deviceType === "tablet");

  if (deviceType === "mobile") {
    label.textContent = "Mobile View";
    if (btnMobile) btnMobile.classList.add("text-purple-400", "bg-purple-500/10");
  } else if (deviceType === "tablet") {
    label.textContent = "Tablet View";
    if (btnTablet) btnTablet.classList.add("text-purple-400", "bg-purple-500/10");
  } else {
    label.textContent = "Desktop View";
    if (btnDesktop) btnDesktop.classList.add("text-purple-400", "bg-purple-500/10");
  }
};

function getInlineFavorites() {
  const data = localStorage.getItem("projectverse_favorites");
  return data ? JSON.parse(data) : [];
}

function isProjectFavorite(p, categoryKey) {
  const favs = getInlineFavorites();
  return favs.some(f => f.title.toLowerCase() === p.title.toLowerCase() && f.category === categoryKey);
}

function toggleInlineFavorite(p, categoryKey) {
  let favs = getInlineFavorites();
  const idx = favs.findIndex(f => f.title.toLowerCase() === p.title.toLowerCase() && f.category === categoryKey);
  const icon = document.getElementById("inline-star-icon");
  const btn = document.getElementById("inline-star-btn");
  let msg = "";

  if (idx > -1) {
    favs.splice(idx, 1);
    if (icon) icon.className = "fa-regular fa-star text-slate-400 text-xs";
    if (btn) btn.title = "Add to Favorites";
    msg = "Removed from Starred Projects!";
  } else {
    favs.push({
      title: p.title,
      icon: p.icon || "fa-cube",
      desc: p.desc || "",
      live: p.live,
      code: p.code,
      category: categoryKey
    });
    if (icon) icon.className = "fa-solid fa-star text-yellow-400 text-xs";
    if (btn) btn.title = "Remove from Favorites";
    msg = "Added to Starred Projects!";
  }

  localStorage.setItem("projectverse_favorites", JSON.stringify(favs));
  showInlineToast(msg);
}

function copyInlineLink() {
  const dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.value = window.location.href;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  showInlineToast("Playroom share link copied!");
}

function showInlineToast(msg) {
  const toast = document.getElementById("inline-toast");
  const msgEl = document.getElementById("inline-toast-message");
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0");
  }, 2500);
}