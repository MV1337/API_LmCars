const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErros = [];

  errors.array().map((err) => extractedErros.push(err.msg));

  return res.status(422).json({
    errors: extractedErros[0],
  });
};

module.exports = validate;
