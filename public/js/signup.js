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
  const res = await makeRequest("/api/auth/register", "POST", {
    name: name.value,
    email: email.value,
    password: password.value
  });

  const response = res.json();

  if (response.success) {
    alert("Succesfully registered user");
    window.location.replace("/");
  } else {
    if (response.error) {
      alert(response.error);
    }
  }
}
