const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  logonShow,
  registerShow,
  registerDo,
  logoff,
} = require("../controllers/sessionController");

router.route("/register").get(registerShow).post(registerDo);

router.route("/logon").get(logonShow);

router.post("/logon", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("Login info:", info); // logs failure message

    if (err) return next(err);

    if (!user) {
      req.flash("error", info?.message || "Login failed");
      return res.redirect("/sessions/logon");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
});

// Logoff route
router.route("/logoff").post(logoff);

module.exports = router;
