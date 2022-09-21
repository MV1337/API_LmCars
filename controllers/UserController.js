const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, `${jwtSecret}`, {
    expiresIn: "1h",
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(422).json({ errors: ["Usuario já cadastrado."] });
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      id: newUser._id,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ errors: ["Ocorreu um erro, tente mais tarde!!!"] });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha incorreta"] });
    return;
  }

  res.status(201).json({
    id: user._id,
    token: generateToken(user._id),
  });
};

module.exports = {
  register,
  login,
};
