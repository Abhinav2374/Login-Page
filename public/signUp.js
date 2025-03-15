const SignUp = document.getElementById("SignUp");
const username_error = document.getElementById("username_error");
const password_error = document.getElementById("password_error");

SignUp.addEventListener("click", (e) => {
  e.preventDefault();
  username_error.textContent = "";
  password_error.textContent = "";
  let has_error = false;
  const usernamevalue = document.getElementById("username").value;
  const passwordvalue = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (usernamevalue.length < 8) {
    username_error.style.display = "block";
    username_error.textContent =
      "The username must contain atleast 8 characters!";
    if (usernamevalue.length == 0) {
      username_error.textContent = "Please enter the username!";
    }
    has_error = true;
  } else {
    username_error.style.display = "none";
  }
  if (passwordvalue.length < 8) {
    password_error.style.display = "block";
    password_error.textContent =
      "The password must contain atleast 8 characters!";
    if (passwordvalue.length == 0) {
      password_error.textContent = "Please enter the password!";
    }
    has_error = true;
  } else {
    password_error.style.display = "none";
  }

  if (passwordvalue != confirmPassword) {
    password_error.style.display = "block";
    password_error.textContent = "Password does not match";
    has_error = true;
  }

  if (!has_error) {
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernamevalue,
        password: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.created) {
          alert("New user created succesfully");
          window.location.replace("/");
        } else if (data.exists) {
          password_error.style.display = "block";
          password_error.textContent = "Username already exists";
        } else if (!data.created) {
          alert("Failed to create new user. Please try again later");
        }
      })
      .catch((err) => {
        console.error("error : ", err);
      });
  }
});
