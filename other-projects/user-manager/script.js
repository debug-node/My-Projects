const userManager = {
  users: [],
  elements: {
    form: document.querySelector("form"),
    username: document.querySelector("#name"),
    role: document.querySelector("#role"),
    bio: document.querySelector("#bio"),
    photo: document.querySelector("#photo"),
    usersContainer: document.querySelector(".users"),
  },

  init() {
    this.elements.form.addEventListener("submit", (e) => this.submitForm(e));
    this.elements.usersContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".delete-btn");
      if (btn) {
        this.removeUser(btn.dataset.index);
      }
    });
  },

  submitForm(e) {
    e.preventDefault();
    this.addUser();
  },

  addUser() {
    const { username, role, bio, photo, form } = this.elements;

    this.users.push({
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    });

    form.reset();
    this.renderUi();
  },

  renderUi() {
    this.elements.usersContainer.innerHTML = this.users
      .map(
        (user, index) => `
      <div class="relative bg-gray-800/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-700 hover:scale-105 transition">
        <button class="delete-btn absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors" data-index="${index}" title="Remove User">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <img class="w-28 h-28 rounded-full object-cover mb-5 border-4 border-gray-600 shadow" src="${user.photo}" alt="User Photo">
        <h2 class="text-2xl font-bold mb-1 text-blue-400">${user.username}</h2>
        <p class="text-purple-400 mb-2 font-medium">${user.role}</p>
        <p class="text-gray-300 text-center">${user.bio}</p>
      </div>
    `,
      )
      .join("");
  },

  removeUser(index) {
    this.users.splice(index, 1);
    this.renderUi();
  },
};

userManager.init();
