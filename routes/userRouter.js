const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/getUsers/", (req, res) => userController.getUsers(req, res));
router.post("/signUp/", (req, res) => userController.signUp(req, res));
router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
