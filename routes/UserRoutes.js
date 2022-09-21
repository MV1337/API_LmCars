const express = require("express");
const router = express.Router();

//modllewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation, loginValition} = require("../middlewares/userValidations")

const {login, register} = require("../controllers/UserController");


router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValition(), validate, login);

module.exports = router;
