const users = [
  {
    name: "Amisha Rathore",
    pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    bio: "silent chaos in a loud world 🖤 | not for everyone",
  },
  {
    name: "Kiara Mehta",
    pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
    bio: "main character energy 🎬 | coffee > everything ☕",
  },
  {
    name: "Aarav Sharma",
    pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    bio: "dream big 🚀 | stay humble 🌿",
  },
  {
    name: "Riya Kapoor",
    pic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
    bio: "sunsets, playlists & peace 🌅🎧",
  },
  {
    name: "Vivaan Singh",
    pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
    bio: "coding all day 💻 | gaming all night 🎮",
  },
  {
    name: "Ananya Verma",
    pic: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500",
    bio: "books 📚 | chai ☕ | rain 🌧️",
  },
  {
    name: "Kabir Malhotra",
    pic: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500",
    bio: "hustle in silence 💯 | let success speak 🔥",
  },
  {
    name: "Meera Joshi",
    pic: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
    bio: "smiles, sketches & soft hearts 🎨💖",
  },
];

const cards = document.querySelector(".cards");
const input = document.querySelector(".inp");

// Render Users
function showUsers(data) {
  cards.innerHTML = "";

  // No User Found
  if (data.length === 0) {
    cards.innerHTML = `<h2 class="not-found">😕 User Not Found</h2>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  data.forEach(({ name, pic, bio }) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${pic}" alt="${name}" class="bg-img" loading="lazy">

      <div class="blurred-layer"
      style="background-image:url('${pic}')"></div>

      <div class="content">
        <h3>${name}</h3>
        <p>${bio}</p>
      </div>
    `;

    fragment.appendChild(card);
  });

  cards.appendChild(fragment);
}

// Initial Render
showUsers(users);

// Debounce Function
function debounce(callback, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

// Search Function — uses includes() for flexible matching
function searchUsers(e) {
  const value = e.target.value.trim().toLowerCase();

  const filteredUsers = users.filter(({ name }) =>
    name.toLowerCase().includes(value),
  );

  showUsers(filteredUsers);
}

// Event Listener with Debouncing
input.addEventListener("input", debounce(searchUsers, 300));
