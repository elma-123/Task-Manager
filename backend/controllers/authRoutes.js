const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/login",
  async (req, res) => {

    const { email, password } =
      req.body;

    const users = JSON.parse(
      fs.readFileSync(
        "./data/userdata.json"
      )
    );

    const user = users.find(
      (u) => u.email === email
    );

    if (!user) {

      return res.status(404).json({
        message: "User Not Found",
      });

    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {

      return res.status(401).json({
        message: "Wrong Password",
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      role: user.role,
    });

  }
);

module.exports = router;