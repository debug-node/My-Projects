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
        (user) => `
      <div class="bg-gray-800/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-700 hover:scale-105 transition">
        <img class="w-28 h-28 rounded-full object-cover mb-5 border-4 border-gray-600 shadow" src="${user.photo}" alt="User Photo">
        <h2 class="text-2xl font-bold mb-1 text-blue-400">${user.username}</h2>
        <p class="text-purple-400 mb-2 font-medium">${user.role}</p>
        <p class="text-gray-300 text-center">${user.bio}</p>
      </div>
    `,
      )
      .join("");
  },

  removeUser() {},
};

userManager.init();
