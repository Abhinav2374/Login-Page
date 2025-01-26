const login = document.getElementById("login");
const username_error = document.getElementById("username_error");
const password_error = document.getElementById("password_error");

function checkConditions(username, password) {
  let isValid = true;

  // Resets all the errors since this function is called in every event.
  setUsernameError("");
  setPasswordError("");

  if (username.length < 8) {
    setUsernameError("The username must contain atleast 8 characters!");
    isValid = false;
  }

  if (username.length == 0) {
    setUsernameError("Please enter a username!");
    isValid = false;
  }
  if (password.length < 8) {
    setPasswordError("The password must contain atleast 8 characters!");
    isValid = false;
  }

  if (password.length == 0) {
    setPasswordError("Please enter a password!");
    isValid = false;
  }

  return isValid;
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!checkConditions(username, password)) return;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
        window.location.replace(`/welcome?username=${username}`);
      } else {
        setPasswordError("Inavlid username or password");
      }
    });
}

function handleSignUp() {
  username_error.textContent = "test";
  const confirmPassword = document.getElementById("confirmPassword").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!checkConditions(username, password)) return;

  if (password != confirmPassword) {
    return setPasswordError("Password does not match");
  }

  fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.created) {
        alert("New user created succesfully");
        window.location.replace("/");
      } else if (data.exists) {
        setUsernameError("Username already exists");
      } else if (!data.created) {
        alert("Failed to create new user. Please try again later");
      }
    })
    .catch((err) => {
      console.error("error : ", err);
    });
}

function setUsernameError(error) {
  username_error.textContent = error;
}

function setPasswordError(error) {
  password_error.textContent = error;
}
