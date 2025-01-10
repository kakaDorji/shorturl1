const User = require('../models/user');
const { setUser } = require('../service/auth'); // Ensure this works as expected
const { v4: uuidv4 } = require("uuid");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    await User.create({ name, email, password });
    return res.redirect("/login"); // Redirect to login after signup
  } catch (error) {
    console.error("Signup error:", error);
    return res.render("signup", { error: "Failed to create user." });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { error: "Invalid login and password" });
    }

    const token = setUser(user); // Ensure setUser returns a valid token
    if (!token) {
      throw new Error("Failed to generate token");
    }

    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return res.render("login", { error: "Login failed. Please try again." });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin
}
