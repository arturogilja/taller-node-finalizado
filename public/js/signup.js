const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  signup();
});

async function signup() {
  //Peticion a endpoint /signup
}
