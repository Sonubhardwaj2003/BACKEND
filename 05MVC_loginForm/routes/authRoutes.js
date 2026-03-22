const express = require("express");
const router = express.Router();

const { getLogin, postLogin } = require("../controllers/authController");

router.get("/", getLogin);
router.post("/login", postLogin);

module.exports = router;