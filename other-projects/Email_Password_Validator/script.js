let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("#loginForm");

let emailError = document.querySelector("#emailError");
let passwordError = document.querySelector("#passwordError");
let resultMessage = document.querySelector("#resultMessage");

// Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";
  resultMessage.textContent = "";

  email.classList.remove("success", "invalid");
  password.classList.remove("success", "invalid");

  let isValid = true;

  if (email.value.trim() === "") {
    emailError.textContent = "Email is required";
    email.classList.add("invalid");
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    emailError.textContent = "Invalid Email";
    email.classList.add("invalid");
    isValid = false;
  } else {
    email.classList.add("success");
  }

  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required";
    password.classList.add("invalid");
    isValid = false;
  } else if (!passwordRegex.test(password.value)) {
    passwordError.textContent =
      "Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number & 1 Special Character";
    password.classList.add("invalid");
    isValid = false;
  } else {
    password.classList.add("success");
  }

  if (isValid) {
    resultMessage.textContent = "✅ Everything is correct";
    resultMessage.style.color = "green";
  }
});
