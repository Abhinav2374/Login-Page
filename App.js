const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Login = require("./model/Loginpage");

mongoose.connect("mongodb://localhost/login");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("Login");
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  const existcheck = await Login.findOne({ username: username });
  if (existcheck != null) {
    console.log("username already exists");
    res.json({ exists: true });
  } else {
    const NewUser = new Login({ username, password });
    NewUser.save()
      .then(() => res.json({ created: true }))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ created: false });
      });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const valid = await Login.findOne({
      username: username,
      password: password,
    });
    if (valid != null) {
      res.json({ valid: true });
    } else {
      res.status(500).json({ valid: false });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/signup", (req, res) => {
  res.render("signUp");
});

app.get("/welcome", (req, res) => {
  const username = req.query.username;
  res.render("welcome", { username: username });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
