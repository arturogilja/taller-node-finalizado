const email = document.getElementById("email");
const password = document.getElementById("password");

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  login();
});

onload();

async function login() {
  // petición a /auth/login
  const res = await makeRequest("/api/auth/login", "POST", {
    email: email.value,
    password: password.value
  });
  const response = await res.json();
  console.log(response);
  if (response.success === true) {
    sessionStorage.setItem("token", response.token);
    window.location.replace("/dashboard.html");
  } else {
    if (response.error) alert(response.error);
    else alert("Unknown Error");
  }
}

function onload() {
  if (sessionStorage.getItem("token"))
    window.location.replace("/dashboard.html");
}
