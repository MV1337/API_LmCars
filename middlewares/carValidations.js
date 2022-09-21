const { body } = require("express-validator");

const createCarValidation = () => {
  return [
    body("brand")
      .notEmpty()
      .withMessage("A marca do carro é obrigatória.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("model")
      .notEmpty()
      .withMessage("O modelo do carro é obrigatório.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("version")
      .notEmpty()
      .withMessage("A versão do carro é obrigatória")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("color")
      .notEmpty()
      .withMessage("A cor do carro é obrigatória.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("motor")
      .notEmpty()
      .withMessage("O motor do carro é obrigatório.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("transmission")
      .notEmpty()
      .withMessage("A transmissão do carro é obrigatória")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("year")
      .notEmpty()
      .withMessage("O ano do carro é obrigatório.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("km")
      .notEmpty()
      .withMessage("A quilometragem do carro é obrigatória.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
    body("price")
      .notEmpty()
      .withMessage("O preço do carro é obrigatório.")
      .isString()
      .withMessage("Digite apenas valores válidos."),
  ];
};

module.exports = {
  createCarValidation,
};
