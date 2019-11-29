const email = document.getElementById("email");
const password = document.getElementById("password");

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  login();
});

async function login() {
  // petición a /auth/login
  const response = await makeRequest("/api/auth/login", "POST", {
    email: email.value,
    password: password.value
  });
  console.log(response);
}
