const logout = document.getElementById("logout");

logout.addEventListener("click", e => {
  sessionStorage.clear();
  window.location.replace("/");
});
