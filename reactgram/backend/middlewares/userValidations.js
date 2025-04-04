const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no minimo 3 characteres"),
    body("email")
      .isString()
      .withMessage("O email e obrigatorio")
      .isEmail()
      .withMessage("Insira um email valido"),
    body("password")
      .isString()
      .withMessage("A senha e obrigatorio")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ser no minimo 5 characteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmacao de senha e obrigatoria")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas nao sao iguais.");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O email e obrigatorio.")
      .isEmail()
      .withMessage("Insira um email valido."),
    body("password").isString().withMessage("A senha e obrigatoria."),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa de pelo menos 3 characteres"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A senha precisa de ter no minimo 5 characteres"),
  ];
};
module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
