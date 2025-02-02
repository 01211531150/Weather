
const registerDiv = document.getElementById("loginForm");
const loginDiv = document.getElementById("loginDiv");
const homeDiv = document.getElementById("homeDiv");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerError = document.getElementById("registerError");
const loginError = document.getElementById("loginError");
const userNameSpan = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");


const users = JSON.parse(localStorage.getItem("users")) || [];


registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

 
  if (users.find((user) => user.email === email)) {
    registerError.textContent = "Email is already registered!";
    return;
  }


  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  registerForm.reset();
  switchToLogin();
});


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const user = users.find((user) => user.email === email);

  if (!user) {
    loginError.textContent = "User not found try again later!";
    return;
  }

  if (user.password !== password) {
    loginError.textContent = "Incorrect password try again later!";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  showHomePage(user);
});


logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  switchToLogin();
});


function switchToLogin() {
  registerDiv.classList.add("hidden");
  loginDiv.classList.remove("hidden");
  homeDiv.classList.add("hidden");
}

function switchToRegister() {
  registerDiv.classList.remove("hidden");
  loginDiv.classList.add("hidden");
  homeDiv.classList.add("hidden");
}

function showHomePage(user) {
  registerDiv.classList.add("hidden");
  loginDiv.classList.add("hidden");
  homeDiv.classList.remove("hidden");
  userNameSpan.textContent = user.name;
}


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  showHomePage(loggedInUser);
} else {
  switchToRegister();
}
