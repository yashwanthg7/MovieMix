const local_storage  = window.localStorage;

function signup(name, email, password) {
  const url = "http://localhost:8000/api/users/";
  const data = {
    name: name,
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
      if (data.message ==="User created successfully") {
        local_storage .setItem("token", data.token);
        window.location.href = "../index.html";
      } else {
        console.log(data)
        alert("Signup failed");
      }
    });
}

document.querySelector(".signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email2").value;
  const password = document.querySelector("#password2").value;

  if (!name || !email || !password) {
    alert("Please enter your name, email, and password");
    return;
  }

  signup(name, email, password);
});
