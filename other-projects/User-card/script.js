const usersContainer = document.querySelector(".users");

function createUserCard(user) {
  const fullName = `${user.name.first} ${user.name.last}`;

  return `
    <article class="w-full max-w-[400px] overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-4 shadow-xl">
      <div class="flex items-center gap-4">
        <img
          class="h-14 w-14 shrink-0 rounded-full border-2 border-neutral-600 object-cover"
          src="${user.picture.large}"
          alt="${fullName}"
          loading="lazy"
        />
        <div class="min-w-0">
          <h2 class="truncate text-base font-bold text-white">${fullName}</h2>
          <p class="truncate text-xs text-neutral-400">${user.email}</p>
          <div class="mt-2 flex items-center gap-2 text-xs text-neutral-300">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Active</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

async function getUsers() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=3");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const { results } = await response.json();
    usersContainer.innerHTML = results.map(createUserCard).join("");
  } catch (error) {
    console.error("Unable to load users:", error);
  }
}

getUsers();

document.querySelector("#refreshBtn").addEventListener("click", getUsers);
