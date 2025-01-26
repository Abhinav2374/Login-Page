const login = document.getElementById("login");
const username_error = document.getElementById("username_error");
const password_error = document.getElementById("password_error");

login.addEventListener("click", (e) => {
  let has_error = false;
  e.preventDefault();
  const usernamevalue = document.getElementById("username").value;
  const passwordvalue = document.getElementById("password").value;
  const welcome = `welcome back ${usernamevalue}`;

  if (usernamevalue.length < 8) {
    username_error.style.display = "inline";
    if (usernamevalue.length == 0) {
      username_error.textContent = "please enter the username!";
    }
    has_error = true;
  } else {
    username_error.style.display = "none";
    has_error = false;
  }
  if (passwordvalue.length < 8) {
    password_error.style.display = "inline";
    if (passwordvalue.length == 0) {
      password_error.textContent = "please enter the password!";
    }
    has_error = true;
  } else {
    password_error.style.display = "none";
    has_error = false;
  }
  if (has_error == false) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernamevalue,
        password: passwordvalue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          window.location.replace(`/welcome?username=${usernamevalue}`);
        } else {
          password_error.style.display = "inline";
          password_error.textContent = "Inavlid username or password";
        }
      });
  }
});
