const localStorage = window.localStorage;

function login(email, password) {
  const url = "http://localhost:8000/api/auth/";
  const data = {
    email: email,
    password: password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "logged in successfully") {
        console.log("Logged In successfully");
        console.log(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        // window.location.href = "../index.html";
      } else {
        console.log(data);
        alert("Login failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function checkAuth() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    return true;
  } else {
    return false;
  }
}

checkAuth();

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    alert("Please enter your email and password");
    return;
  }

  login(email, password);
});
