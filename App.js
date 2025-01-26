import express from "express";
import mongoose from "mongoose";
import Login from "./model/Loginpage.js";

const PORT = 3000;

mongoose.connect("mongodb://localhost/login");

const app = express();

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
  if (existcheck != null) return res.json({ exists: true });

  const NewUser = new Login({ username, password });
  NewUser.save()
    .then(() => res.status(201).json({ created: true }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ created: false });
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const valid = await Login.findOne({
      username: username,
      password: password,
    });

    if (valid != null) return res.json({ valid: true });

    res.status(404).json({ valid: false });
  } catch (err) {
    console.log(err);
  }
});

app.get("/signup", (req, res) => {
  res.render("signUp");
});

app.get("/welcome", (req, res) => {
  const username = req.query.username;
  if (!username) res.redirect("/");

  res.render("welcome", { username: username });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
