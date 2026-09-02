const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

function setError(input, errorId, condition) {
  const errorEl = document.querySelector(`#${errorId}`);
  input.classList.toggle("ring-red-500", condition);
  input.classList.toggle("ring-slate-600", !condition);
  errorEl.classList.toggle("hidden", !condition);
  return condition;
}

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const hasErrors = [
    setError(nameInput, "nameError", !nameInput.value.trim()),
    setError(emailInput, "emailError", !emailInput.value.includes("@")),
    setError(passwordInput, "passwordError", passwordInput.value.length < 6),
  ].some(Boolean);

  if (hasErrors) return;

  try {
    await fetch("url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    });

    form.reset();
    document.querySelector("#successMsg").classList.remove("hidden");
  } catch (error) {
    console.error("Submit failed:", error);
  }
});
